import { useCallback, useEffect } from "react";
import { registerQuery, unregisterQuery } from "../redux/QueryBarData";
import { createDispatchHook, createSelectorHook } from "react-redux";
import { PhotoReduxContext, PhotoReduxData, Query, QueryArray } from "../index";

function useQueryConstructor(context: PhotoReduxContext, toRegist: Map<string, Query>) {
  const selector = useCallback(createSelectorHook(context), [context]);
  const dispatch = useCallback(createDispatchHook(context)(), [context]);
  const [query, registered] = selector((i: PhotoReduxData): [QueryArray, Set<string>] => {
    return [i.queryReducer.query, i.queryReducer.registered];
  });
  useEffect(() => {
    registered.forEach((i) => {
      const { initValue, expectType, disabled } = query[i];
      if (toRegist.get(i) !== query[i]) {
        dispatch(unregisterQuery(i));
      }
    });
    toRegist.forEach((q, name) => {
      dispatch(registerQuery(name, q));
    });
  }, [registered]);
}

export default useQueryConstructor;
