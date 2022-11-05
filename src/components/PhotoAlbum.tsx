import { createStore } from "redux";
import reducer from "../redux/reducer";
import { createSelectorHook, Provider } from "react-redux";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { setImages, setQuery } from "../redux/photoAlbum";
import {
  PhotoReduxData,
  ImageData,
  MergedQuery,
  PhotoReduxContext,
  ProcessedQuery,
  QueryReducer,
  PhotoAlbum,
} from "../index";
import React = require("react");
import PropTypes from "prop-types";

const defaultProcFunc = (query: MergedQuery): ProcessedQuery => {
  const procedQuery: ProcessedQuery = {};
  query.__list.map((i) => {
    procedQuery[i] = query[i].toString();
  });
  return procedQuery;
};

interface PhotoAlbumProps {
  context: PhotoReduxContext;
  children: ReactElement | Array<ReactElement>;
  autoFetch: boolean;
  fetchFunction: (parsedQuery: ProcessedQuery) => Array<ImageData>;
  procFunction: typeof defaultProcFunc;
}

function PhotoAlbum({ context, children, autoFetch, fetchFunction, procFunction }: PhotoAlbumProps) {
  const [store] = useState(createStore(reducer));
  const selector = useCallback(createSelectorHook(context), [context]);
  const query = selector((i: PhotoReduxData) => {
    return i.queryReducer;
  });
  const procedQuery = selector((i: PhotoReduxData) => {
    return i.photoAlbum.query;
  });
  useEffect(() => {
    const mergedQuery: MergedQuery = {
      __list: [],
    };
    query.registered.forEach((i) => {
      if (!query.query[i].disabled) {
        mergedQuery.__list.push(i);
        mergedQuery[i] = query.query[i].value;
      }
    });
    if (procFunction) {
      store.dispatch(setQuery(procFunction(mergedQuery)));
    } else {
      store.dispatch(setQuery(defaultProcFunc(mergedQuery)));
    }
  }, [procFunction, query]);
  useEffect(() => {
    if (autoFetch) {
      store.dispatch(setImages(fetchFunction(procedQuery)));
    }
  }, [autoFetch, fetchFunction, procedQuery]);
  return (
    <Provider store={store} context={context}>
      {children}
    </Provider>
  );
}

export default PhotoAlbum;
