import React from "react";
import "./soundcloud-item.css";
import CardItem from "../card-item/CardItem";
import { TiMediaPlay } from "react-icons/ti";
import {connect} from 'react-redux';
import {setCurrentSong} from '../../actions'

class SoundcloudItem extends React.Component {
  _handleClick = () => {
    this.props.setCurrentSong(this.props.song, true);
  }

  render() {
    const track = this.props.song;
    return (
      <div className="soundcloud-item row-item" onClick={this._handleClick}>
        <CardItem
          title={track.title != null ? track.title : "Unknown title"}
          subtitle={track.user != null ? track.user.username : "Unknown Artist"}
          image={
            track.artwork_url != null
              ? track.artwork_url.replace("large", "t300x300")
              : "song.png"
          }
        >
          <div className="ms_main_overlay">
            <div className="ms_box_overlay"></div>
            <div className="ms_play_icon">
              <TiMediaPlay className="card-play-icon"/>
            </div>
          </div>
        </CardItem>
      </div>
    );
  }
}

export default connect(null, {setCurrentSong})(SoundcloudItem);
