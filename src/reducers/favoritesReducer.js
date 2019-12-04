import { FETCH_FAVORITES } from "../konstants/konstants";

export default (favorites = [], {action, payload}) => {
    switch(action){
        case FETCH_FAVORITES:
            return payload;
        default: 
            return favorites;
    }
}