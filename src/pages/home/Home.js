import React from "react";
import "./home.css";
import HeadingText from "./../../components/heading-text/HeadingText";
import CardItem from "./../../components/card-item/CardItem";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { connect } from "react-redux";
import { fetchSongs, fetchRecents } from "./../../actions";
import Message from "./../../components/message/Message";
import { FaRegFrownOpen } from "react-icons/fa";
import { swiperProps } from "../../konstants/konstants";
import SongItem from "../../components/song-item/SongItem";
import {getImageFromID3Tag, getDurationString} from './../../utils/helpers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSong: null };
  }

  componentDidMount() {
    this.props.fetchSongs();
    this.props.fetchRecents();
  }

  renderRecents() {
    if (this.props.songs.length > 0 && this.props.recents.length > 0) {
      return (
        <section>
          <HeadingText to="#">Recently Played</HeadingText>
          <Swiper {...swiperProps}>
            {this.props.recents.map((item, index) => {
              console.log(item);
              return (
                <CardItem
                  title={item.artist != null ? item.artist : 'Unknown artist'}
                  subtitle={item.name != null ? item.name : item.originalName}
                  muted={getDurationString(item.songDuration)}
                  image={item.image != null ? getImageFromID3Tag(item.image) : 'song.png'}
                  key={index}
                />
              );
            })}
          </Swiper>
        </section>
      );
    } else if (this.props.songs.length > 0 && this.props.recents.length < 1) {
      return (
        <section>
          <HeadingText to="#">Recently Played</HeadingText>
          <p className="muted-text centered-text sad-message">
            You haven't played any songs yet
          </p>
        </section>
      );
    }
  }

  renderSongs() {
    if (this.props.songs.length > 0) {
      return (
        <section className="songs-section">
          <HeadingText to="#" more={this.props.songs.length}>
            My songs
          </HeadingText>
          <div className="three-column-row">
            {this.props.songs.map((song) => {
              return (<SongItem key={song.filePath} song={song}/>)
            })}
          </div>
        </section>
      );
    } else {
      return (
        <Message
          heading="No songs"
          subheading="You have not imported any songs to your VLMe library. Import songs using the button on top"
          icon={<FaRegFrownOpen />}
        />
      );
    }
  }

  render() {
    return (
      <div className="page-wrapper">
        {this.renderRecents()}
        {this.renderSongs()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { songs: state.songs, recents: state.recents };
};

export default connect(mapStateToProps, { fetchSongs, fetchRecents })(Home);
