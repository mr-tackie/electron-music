
const dataurl = window.require('dataurl');
const fs = window.require('fs');

class PathParser{
    //this function accepts a path and parses it into a format that is understandable by HTML5 audio
    parsePath(path){
        const data = new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if(error){
                    reject(error)
                }

                resolve(dataurl.convert({data, mimetype: 'audio/mp3'}));
            })
        })

        return data;
    }
}

export const pathParser = new PathParser();