import Store from "../data/Store";

export class UserPreferenceStore {
  constructor() {
    this.store = new Store({
        configName: 'user-preferences',
        defaults: {
            favorites: [],
            recents: [],
            settings: {
                
            }
        }
    });
  }

  getRecents(){
      return this.store.get('recents');
  }

  addSongToRecents(song){
    let newRecentsArray = [];
    const recents = this.store.get('recents');
    newRecentsArray = recents.filter(item => item.filePath !== song.filePath);
    newRecentsArray = [song, ...newRecentsArray];
    this.store.set('recents', newRecentsArray);
    console.log(newRecentsArray)
  }

}
