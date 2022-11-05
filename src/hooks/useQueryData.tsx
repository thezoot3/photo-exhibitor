import { createDispatchHook, createSelectorHook } from "react-redux";
import { modifyQuery } from "../redux/QueryBarData";
import { useCallback } from "react";
import { MergedQuery, PhotoReduxContext, PhotoReduxData, Query } from "../index";

const useQueryData = (query: string, context: PhotoReduxContext) => {
  const selector = useCallback(createSelectorHook(context), [context]);
  const dispatch = useCallback(createDispatchHook(context)(), [context]);
  const queryData = selector((content: PhotoReduxData) => {
    return content.queryReducer.query[query];
  });
  const modifyFunction = useCallback((): ((callback: (a: Query) => MergedQuery) => void) | (() => void) => {
    if (queryData) {
      return (f: ((a: Query) => MergedQuery) | MergedQuery) => {
        if (typeof f !== "function") {
          dispatch(modifyQuery(query, f));
        }
        dispatch(modifyQuery(query, (f as (a: Query) => MergedQuery)(queryData)));
      };
    }
    return () => {
      throw new Error("You cannot modify query because query with that name have not been defined.");
    };
  }, [dispatch, queryData, query]);
  return [queryData, modifyFunction()];
};
export default useQueryData;
