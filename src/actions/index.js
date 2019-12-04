import {userPreferenceStore} from '../data/stores';
import {SongStore} from '../stores/SongStore';
import { FETCH_SONGS, FETCH_FAVORITES, FETCH_RECENTS, SET_CURRENT_SONG, SET_SOUNDCLOUD_RESULTS } from '../konstants/konstants';

//Action creator to load songs into app state
export const fetchSongs = () => {
    const songStore = new SongStore();
    return {
        type: FETCH_SONGS,
        payload: songStore.getSongs()
    }
}

export const setCurrentSong = (song, isSoundCloud) => {
    return {
        type: SET_CURRENT_SONG,
        payload: {song, isSoundCloud}
    }
}

//Action creator to load favorites into app state
export const fetchFavorites = () => {
    const favorites = userPreferenceStore.get('favorites');
    
    return {
        type: FETCH_FAVORITES,
        payload: favorites
    }
}


//Action creator to load recently played song into app state
export const fetchRecents = () => {
    const recents = userPreferenceStore.get('recents');
    return {
        type: FETCH_RECENTS,
        payload: recents
    }
}

//set soundcloud results 
export const setSoundCloudResults = (results) => {
    return {
        type: SET_SOUNDCLOUD_RESULTS,
        payload: results
    }
}