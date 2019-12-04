import React from "react";
import "./audio-player.css";
import { connect } from "react-redux";
import {
  TiMediaPlay,
  TiMediaPause,
  TiMediaFastForward,
  TiMediaRewind
} from "react-icons/ti";
import { getDurationString, getImageFromID3Tag } from "../../utils/helpers";
import { UserPreferenceStore } from "../../stores/UserPreferenceStore";
import { fetchRecents } from "../../actions";
import SC from "../../konstants/sc";

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      expanded: false
    };
    this._audio = null;

    this._resetSong = false;
    this._userPreferenceStore = new UserPreferenceStore();
  }

  _toggleExpanded = () => {
    if (this.props.playList.currentSong !== null) {
      this.setState({ expanded: !this.state.expanded });
    }
  };

  //reset the player to play the new song if the song was changed
  componentDidUpdate = () => {
    if (this._resetSong) {
      this._initializePlayer();
    }
  };

  //check to see if the song selected is the current song playing
  componentWillReceiveProps = ({ playList }) => {
    console.log(playList);
    const currentSong = this.props.playList.currentSong;
    if (
      currentSong == null ||
      currentSong.filePath !== playList.currentSong.filePath || currentSong.id !== playList.currentSong.id
    ) {
      this._resetSong = true;
    }
  };

  //initialise the audio player when the component is loaded
  componentDidMount() {
    this._initializePlayer();
  }

  //load the URI of the song for the player to play
  _initializePlayer = () => {
    this._resetSong = false;
    if(this._audio){
      this._audio.pause();
    }

    if (
      this.props.playList.currentSong &&
      !this.props.playList.currentSongIsSoundCloud
    ) {
      this._audio = new Audio();

      this._audio.addEventListener("pause", () => {
        this.setState({ isPlaying: false });
      });

      this._audio.addEventListener("play", () => {
        this.setState({ isPlaying: true });
      });

      this._audio.addEventListener("ended", () => {
        this.setState({ isPlaying: false });
      });

      this._audio.src = this.props.playList.currentSong.filePath;
      this._audio.load();
      this._audio.play();

      this._userPreferenceStore.addSongToRecents(
        this.props.playList.currentSong
      );
      this.props.fetchRecents();
      this.setState({ isPlaying: true });
    } else if (
      this.props.playList.currentSong &&
      this.props.playList.currentSongIsSoundCloud
    ) {
      console.log('about to change the track');
      SC.stream(`/tracks/${this.props.playList.currentSong.id}`)
        .then(player => {
          this._audio = player;
          this._audio.play();

          this._audio.bind("pause", () => {
            this.setState({ isPlaying: false });
          });
    
          this._audio.bind("play", () => {
            this.setState({ isPlaying: true });
          });

          this._audio.bind("finish", () => {
            this.setState({ isPlaying: false });
          });
          this.setState({ isPlaying: true });
        })
        .catch(e => console.warn(e));
    }
  };

  //toggle player between play and pause modes
  _togglePlayPause = () => {
    if (this.state.isPlaying) {
      this._audio.pause();
    } else {
      if (this.props.playList.currentSong) {
        this._audio.play().catch(e => {
          console.error(e);
        });
      }
    }
  };

  //move to the next track in the playlist
  _nextTrack = () => {};

  _showHover = () => {};

  //display the artist name for the current playing song
  _getArtistName() {
    if (!this.props.playList.currentSongIsSoundCloud) {
      if (this.props.playList.currentSong == null) {
        return "N/A";
      } else {
        if (this.props.playList.currentSong.artist == null) {
          return "Uknown artist";
        }
        return this.props.playList.currentSong.artist;
      }
    } else {
      return this.props.playList.currentSong.user.username;
    }
  }

  //display the song name for the current playing song
  _getSongName() {
    if (!this.props.playList.currentSongIsSoundCloud) {
      if (this.props.playList.currentSong == null) {
        return "N/A";
      } else {
        if (this.props.playList.currentSong.title == null) {
          return this.props.playList.currentSong.originalName;
        }
        return this.props.playList.currentSong.title;
      }
    } else {
      return this.props.playList.currentSong.title;
    }
  }

  //get duration of the song
  _getSongDuration() {
    if (!this.props.playList.currentSongIsSoundCloud) {
      if (this.props.playList.currentSong == null) {
        return "N/A";
      } else {
        return getDurationString(this.props.playList.currentSong.songDuration);
      }
    } else {
      return getDurationString(this.props.playList.currentSong.duration);
    }
  }

  _getCoverArt() {
    if (!this.props.playList.currentSongIsSoundCloud) {
      if (
        this.props.playList.currentSong == null ||
        this.props.playList.currentSong.image == null
      ) {
        return "song.png";
      } else {
        return getImageFromID3Tag(this.props.playList.currentSong.image);
      }
    } else {
      if (this.props.playList.currentSong.artwork_url) {
        return this.props.playList.currentSong.artwork_url.replace(
          "large",
          "t300x300"
        );
      } else {
        return "song.png";
      }
    }
  }

  render() {
    return (
      <div className="player-wrapper">
        <div className="player">
          <div
            id="player-track"
            className={!this.state.expanded ? "inactive" : "active"}
          >
            <div id="album-name">{this._getArtistName()}</div>
            <div id="track-name" className="marquee">
              {this._getSongName()}
            </div>
            <div id="track-time" className="active">
              <div id="current-time">0:00</div>
              <div id="track-length">{this._getSongDuration()}</div>
            </div>
            <div id="s-area" ref="sArea">
              <div id="ins-time"></div>
              <div id="s-hover"></div>
              <div id="seek-bar"></div>
            </div>
          </div>
          <div id="player-content">
            <div id="album-art" onClick={this._toggleExpanded}>
              <img
                src={this._getCoverArt()}
                className={`active ${this.state.isPlaying ? "playing" : ""}`}
                id="_1"
                alt=""
              />
              <div id="buffer-box">Buffering ...</div>
            </div>
            <div id="player-controls">
              <div className="control">
                <div className="control-button" id="play-previous">
                  <TiMediaRewind className="player-icon" />
                </div>
              </div>
              <div className="control">
                <div
                  className="control-button"
                  id="play-pause-button"
                  onClick={this._togglePlayPause}
                >
                  {!this.state.isPlaying ? (
                    <TiMediaPlay className="player-icon" />
                  ) : (
                    <TiMediaPause className="player-icon" />
                  )}
                </div>
              </div>
              <div className="control">
                <div className="control-button" id="play-next">
                  <TiMediaFastForward className="player-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ playList }) => {
  return { playList };
};

export default connect(mapStateToProps, { fetchRecents })(AudioPlayer);
