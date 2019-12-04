import React from "react";
import "./song-item.css";
import { connect } from "react-redux";
import {setCurrentSong} from '../../actions';
import {getDurationString, getImageFromID3Tag} from '../../utils/helpers';

const SongItem = ({ song, currentSong, setCurrentSong }) => {
  const setThisAsCurrentSong = () => {
    setCurrentSong(song, false);
  }

  const getImage = () => {
    if(song.image == null){
      return 'song.png'
    }else{
      return getImageFromID3Tag(song.image);
    }
  }

  return (
    <div className="row-item" onClick={setThisAsCurrentSong}>
      <div className="song-item">
        <div className="song-details">
          <div className="song-image">
            <img src={getImage()} alt="Album art" />
          </div>
          <div className="song-main">
            <h3>{song.title == null? song.originalName : song.title}</h3>
            <span>{song.artist == null? 'Unknown Artist' : song.artist}</span>
          </div>
        </div>
        <div className="song-duration">
          <p>{getDurationString(song.songDuration)}</p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

const mapStateToProps = ({ currentSong }) => {
  return { currentSong: currentSong };
};

export default connect(mapStateToProps, {setCurrentSong})(SongItem);
