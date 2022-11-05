import { ImageData, MergedQuery, PhotoAlbum, ProcessedQuery } from "../index";

const defaultAlbum: PhotoAlbum = {
  query: {},
  images: [],
};

const SET_QUERY = "SET_QUERY";
const SET_IMAGES = "SET_IMAGES";
const CLEAR_IMAGES = "CLEAR_IMAGES";
export const setQuery = (query: ProcessedQuery) => {
  return {
    type: SET_QUERY,
    query,
  };
};
export const setImages = (imageData: Array<ImageData>) => {
  return {
    type: SET_IMAGES,
    imageData,
  };
};
export const clearImages = () => {
  return {
    type: CLEAR_IMAGES,
  };
};
export const reducer = (state = defaultAlbum, action: { type: string; query?: object; imageData?: Array<object> }) => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.query };
    case SET_IMAGES:
      return { ...state, images: action.imageData };
    case CLEAR_IMAGES:
      return { ...state, images: {} };
    default:
      return state;
  }
};
