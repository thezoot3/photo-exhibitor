import { createSelectorHook } from "react-redux";
import { ReactElement, useCallback, useEffect, useState } from "react";
import React = require("react");
import { PhotoReduxData, PhotoReduxContext, ImageData } from "../index";

interface PhotoContainerProps {
  context: PhotoReduxContext;
  sort: (a: object, b: object) => number;
  element: ReactElement;
}

function PhotoContainer({ context, sort, element }: PhotoContainerProps) {
  const selector = useCallback(createSelectorHook(context), [context]);
  const photoList = selector((i: PhotoReduxData) => {
    return i.photoAlbum.images;
  });
  const [photo, setPhoto] = useState<Array<ImageData>>([]);
  useEffect(() => {
    setPhoto(sort ? photoList.sort(sort) : photoList);
  }, [photoList, sort]);
  return photo.map((data, i) => {
    return React.cloneElement(element, { photoData: data, key: i });
  });
}

export default PhotoContainer;
