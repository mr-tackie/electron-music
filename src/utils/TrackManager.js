const musicMetadata = window.require('music-metadata');

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
        });
        
        return songsPromise;
    }

    async getSongMeta(song){
        const {filePath} = song;
        const metadata = await musicMetadata.parseFile(filePath, {duration: true});
        Object.assign(song, {song, songDuration: metadata.format.duration, ...metadata.common});
    }
    
    async createSongObject(filePath, name=''){
        const song = {filePath, originalName: name};
        return await this.getSongMeta(song);
    }
}
