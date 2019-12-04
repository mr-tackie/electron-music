import Store from "../data/Store";
import _ from 'lodash';

export class SongStore {
  constructor() {
    this.store = new Store({
      configName: "songs-list",
      defaults: {
        songs: []
      }
    });
  }

  getSongs(){
      return this.store.get('songs');
  }

  updateSongs(songs){
    let newSongsArray = [];
    const previousSongs = this.store.get('songs');
    newSongsArray = [...previousSongs, ...songs];
    this.store.set('songs', _.uniqBy(newSongsArray, 'filePath'));
  }

}
