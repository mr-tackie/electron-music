const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");

class Store {
  constructor(options) {
    //allow both renderer and main processes to access user data i.e
    //electron.app for the main process and remote.app for renderer process

    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );

    //over here i am generating a path to the configuration json file by joining
    //the path to the user data directory and the name of the json file
    this.path = path.join(userDataPath, options.configName + ".json");

    this.data = this.parseDataFile(this.path, options.defaults);
  }

  //function to get data for a particular key
  get(key) {
    return this.data[key];
  }

  //function to set data for a particular key duhhhhhh
  set(key, data) {
    this.data[key] = data;
    //since this is not for a server I/O overhead is not much of an issue
    //so I could afford to use sync writeFile method. And I just don't want to use redux-thunk here :)
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  clear(){
    //I should probably replace all my synchronous functions but for now I want the stuff to work
    //this function just deletes the json file
    if(fs.existsSync(this.path)){
      fs.unlinkSync(this.path);
    }
  }

  parseDataFile(filePath, defaults) {
    //try catch to see if json file exists/ create if not otherwise return data
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      return defaults;
    }
  }
}

export default Store;
