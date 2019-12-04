import React from "react";
import "./soundcloud-results.css";
import HeadingText from "../../components/heading-text/HeadingText";
import SoundcloudItem from "../soundcloud-item/SoundCloudItem";

class SoundcloudResults extends React.Component {
  render() {
    const results = this.props.results;
    console.log(results);
    const subtitle = this.props.hasSearched ? `Showing ${results.length} result${results.length !== 1 ? 's' : ''}` : 'You have not searched for anything yet';
    return (
      <div className="scresults-wrapper">
        <HeadingText to="#" subtitle={subtitle}>Results</HeadingText>
        <div className="four-column-row">
        {results.map((track, index) => {
            return (<SoundcloudItem
            key={index}
            song={track}
            />)
        })}
        </div>
      </div>
    );
  }
}

export default SoundcloudResults;
