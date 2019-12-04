import { FETCH_RECENTS } from "../konstants/konstants";

export default (recents = [], {type, payload}) => {
    switch(type){
        case FETCH_RECENTS:
            return payload;        
        default:
            return recents;
    }
}