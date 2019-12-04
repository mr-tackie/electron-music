import { combineReducers } from "redux";
import songsReducer from './songsReducer';
import favoritesReducer from './favoritesReducer';
import recentsReducer from './recentsReducer';
import playlistReducer from "./playlistReducer";
import soundCloudSearchReducer from "./soundCloudSearchReducer";

export default(combineReducers({
    songs: songsReducer,
    favorites: favoritesReducer,
    recents: recentsReducer,
    playList: playlistReducer,
    soundCloudResults: soundCloudSearchReducer
}))