const mp3Duration = window.require('mp3-duration');
const id3 =  window.require('node-id3');

export class TrackParser{
    constructor(urls = []){
        this.urls = urls;
    }

    async parseTracks(){
        let songsPromise = new Promise(async (resolve, reject) => {
            let songs = [];
            
            for(let url of this.urls){
                const song = await this.createSongObject(url.fullname, url.name);
                songs.push(song);
            }

            if(songs){
                resolve(songs);
            }else{
                reject("COULD NOT PARSE TRACKS");
            }
        })
        
        return songsPromise;
    }

    //I need meta data of the songs. Duration is not provide by id3 so 
    //i need to write a seperate function to get the song's duration
    getSongDuration(path){
        const duration = new Promise((resolve, reject) => {
            mp3Duration(path, (error, duration) => {
                if(duration){
                    resolve(duration);
                }else{
                    reject(error)
                }
            });
        })

        return duration;
    }

    async getSongMeta(song){
        const {filePath} = song;
        const meta = new Promise((resolve, reject) => {
            id3.read(filePath, (error, tags) => {
                if(tags){
                    resolve(Object.assign(song, {...tags}))
                }else{
                    reject(error);
                }
            })
        });

        return meta;
    }
    
    async createSongObject(filePath, name=''){
        const song = {};
        const songDuration = await this.getSongDuration(filePath);
        Object.assign(song, {songDuration, filePath, originalName: name});
        return await this.getSongMeta(song);
    }
}