const rra = window.require('recursive-readdir-async');
//this class is used to read music files from storage.
//it accepts a path to look into and then returns files of type mp3 in the folder
class FileReader{
    constructor(path){
        this.path = path;
    }

    async readFiles(){
        const options = {
            include: ['mp3']
        }
        const fileList = await rra.list(this.path, options);
        return fileList;
    }
}

export default FileReader;