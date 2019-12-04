import React from "react";
import "./online.css";
import SC from '../../konstants/sc';
import SoundcloudResults from '../../components/soundcloud-results/SoundcloudResults';
import Banner from '../../components/banner/Banner'
import {connect} from 'react-redux';
import {setSoundCloudResults} from '../../actions'

class OnlineMusic extends React.Component {

  constructor(props){
    super(props);
    this.state = {hasSearched: false, isSearching: false, searchTerm: ''}
  }
  
  _getSoundsFromSoundCloud = async () => {
    this.setState({isSearching: true});
    const tracks = await SC.get('/tracks', {
      q: this.state.searchTerm,
      limit: 50
    });
    this.props.setSoundCloudResults(tracks);
    this.setState({isSearching: false, hasSearched: true});
  }
  

  
  render() {
    return (
      <div className="page-wrapper">
        <Banner
        titleTop="Explore Music"
        titleBottom="From SoundCloud!"
        text="Tap into the endless amount of music on SoundCloud&trade;. Begin by searching for any song"
        image="soundcloud.png">
            <div className="ms_banner_search">
              <input placeholder="Search for artists, bands, tracks or podcasts" value={this.state.searchTerm} onChange={(e) => this.setState({searchTerm: e.target.value})}/>
              <button className="soundcloud-button" onClick={this._getSoundsFromSoundCloud}>{this.state.isSearching? <div>Searching... </div> : 'Search'}</button>
            </div>
        </Banner>
        <SoundcloudResults results={this.props.results} hasSearched={this.state.hasSearched}/>
      </div>
    );
  }
}

const mapStateToProps = ({soundCloudResults}) => {
  return {results: soundCloudResults};
}
export default connect(mapStateToProps, {setSoundCloudResults})(OnlineMusic);
