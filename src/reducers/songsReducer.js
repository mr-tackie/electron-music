import { FETCH_SONGS } from "../konstants/konstants";

export default (songs = [], {type, payload}) => {
    switch(type){
        case FETCH_SONGS:
            return payload;
        default:
            return songs;
    }
};