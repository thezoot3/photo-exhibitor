import {checkRequireArgs, checkTypeArgs, applyMultipleCheck} from '../utils/arg_check'
const defaultAlbum = {
    query: {},
    images: {}
}
const SET_QUERY = "SET_QUERY";
const SET_IMAGES = "SET_IMAGES";
const CLEAR_IMAGES = "CLEAR_IMAGES";
export const setQuery = applyMultipleCheck((query = {}) => {
  return {
    type: SET_QUERY,
    query,
  }
}, [checkRequireArgs, [1]], [checkTypeArgs, [Object]])
export const setImages = applyMultipleCheck((imageData) => {
  return {
    type: SET_IMAGES,
    imageData,
  }
}, [checkRequireArgs, [1]], [checkTypeArgs, [Object]])
export const clearImages = () => {
  return {type: CLEAR_IMAGES}
}
export const reducer = (state = defaultAlbum, action) => {
  switch(action.type) {
    case SET_QUERY:
      return {...state, query: action.query}
    case SET_IMAGES:
      return {...state, imageData: action.imageData}
    case CLEAR_IMAGES: 
      return {...state, imageData: {}}
    default:
      return state
  }
}
