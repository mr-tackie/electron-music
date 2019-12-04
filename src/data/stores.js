import Store from './Store';

//this store handles the songs-list.json file to read and write song directories
export const songStore =  new Store({
    configName: 'songs-list',
    defaults: {
        songs: []
    }
});

//this store handles the user-preferences.json file to read and write user preferences
export const userPreferenceStore = new Store({
    configName: 'user-preferences',
    defaults: {
        favorites: [],
        recents: [],
        settings: {
            
        }
    }
})