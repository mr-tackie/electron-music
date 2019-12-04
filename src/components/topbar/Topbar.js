import React from 'react';
import './topbar.css';
import Button from './../button/Button';
import InputItem from './../input-item/InputItem';
import FileReader from '../../data/FileReader';
import {SongStore} from '../../stores/SongStore';
import { connect } from "react-redux";
import {fetchSongs} from '../../actions';
import { TrackParser } from "../../utils/TrackManager";
import { TiNotesOutline } from "react-icons/ti";

const { dialog } = window.require('electron').remote

const Topbar = ({fetchSongs}) => {
    const [loading, setLoading] = React.useState(false);
    
    const handleImport = () => {

        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(async (result) => {
            if(!result.canceled){
                setLoading(true);
                const fr = new FileReader(result.filePaths[0]);
                const files = await fr.readFiles();

                const trackParser = new TrackParser(files);
                const songs = await trackParser.parseTracks(); 
                const songStore = new SongStore();
                songStore.updateSongs(songs);
                fetchSongs();

                new Notification('Done', {
                    body: 'Songs successfully loaded',
                    icon: 'logo.png'
                });


                setLoading(false);
            }
        })
    }
    
    
    return (
        <div className="ms_header">
            <div className="ms_top_left">
                <div className="ms_top_search">
                    <InputItem placeholder="Search for music"/>
                </div>
            </div>
            <div className="ms_top_right">
                <div className="">
                    <Button onClick={handleImport}>{!loading ? 'import songs' : <TiNotesOutline className="pulse" style={{fontSize: 24}}/>}</Button>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {fetchSongs})(Topbar);