import { Context } from "react";
import { ReactReduxContextValue } from "react-redux";

export interface QueryExtendedType {
  readonly __type?: string;
  readonly toString: () => string;
}

export interface MergedQuery {
  __list: Array<string>;

  [key: string]: QueryExtendedType;
}

export interface ProcessedQuery {
  [key: string]: string;
}

export interface ImageData {
  id: string;
}

export interface QueryReducer {
  registered: Set<string>;
  query: QueryArray;
}

export interface QueryArray {
  [name: string]: Query;
}

export interface Query {
  value: QueryExtendedType | undefined;
  initValue: QueryExtendedType;
  expectType: string;
  disabled: boolean;
}

export interface PhotoAlbum {
  query: ProcessedQuery;
  images: Array<ImageData>;
}

export interface PhotoReduxData {
  queryReducer: QueryReducer;
  photoAlbum: PhotoAlbum;
}

declare type PhotoReduxContext = Context<ReactReduxContextValue<PhotoReduxData>>;
