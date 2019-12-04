import { SET_SOUNDCLOUD_RESULTS } from "../konstants/konstants";

const initialState = [];

export default (results = initialState, {type, payload}) => {
    switch(type){
        case SET_SOUNDCLOUD_RESULTS:
            return payload;
        default:
            return results;
    }
}