import {reducer as queryReducer} from './queryData';
import {reducer as photoReducer} from './photoAlbum';
import {combineReducers} from "redux";

export default combineReducers({queryReducer, photoReducer});
