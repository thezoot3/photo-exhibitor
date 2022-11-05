import { reducer as queryReducer } from "./QueryBarData";
import { reducer as photoReducer } from "./photoAlbum";
import { combineReducers } from "redux";

export default combineReducers({ queryReducer, photoReducer });
