import { SET_CURRENT_SONG } from "../konstants/konstants";

const initialState = {
    currentSong: null,
    currentSongIsSoundCloud: false,
    playList: []
}

export default (playList = initialState, {type, payload}) =>{
    switch(type){
        case SET_CURRENT_SONG:
            return {...initialState, currentSong: payload.song, currentSongIsSoundCloud: payload.isSoundCloud};
        default:
            return playList;
    }
}