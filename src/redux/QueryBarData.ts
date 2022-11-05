import { Query, QueryReducer, QueryExtendedType } from "../index";

const MODIFY_QUERY = "MODIFY_QUERY";
const REGISTER_QUERY = "REGISTER_QUERY";
const UNREGISTER_QUERY = "UNREGISTER_QUERY";
const DISABLE_QUERY = "DISABLE_QUERY";
const default_query: QueryReducer = {
  registered: new Set<string>(),
  query: {},
};

export const modifyQuery = (name: string, value: QueryExtendedType) => {
  return {
    type: MODIFY_QUERY,
    name,
    value,
  };
};
export const registerQuery = (name: string, { initValue, expectType }: Query) => {
  return {
    type: REGISTER_QUERY,
    name,
    initValue,
    expectType,
  };
};
export const unregisterQuery = (name: string) => {
  return {
    type: UNREGISTER_QUERY,
    name,
  };
};
export const disableQuery = (name: string, disabled: boolean) => {
  return {
    type: DISABLE_QUERY,
    name,
    disabled,
  };
};
export const reducer = (
  state = default_query,
  action: {
    type: string;
    name: string;
    value?: QueryExtendedType;
    initValue?: QueryExtendedType;
    expectType?: string;
    disabled?: boolean;
  }
) => {
  switch (action.type) {
    case MODIFY_QUERY:
      if (state.registered.has(action.name)) {
        const expType = state.query[action.name].expectType;
        if (expType) {
          if (!action.value?.__type || action.value?.__type !== expType) {
            if (typeof action.value !== expType) {
              throw new Error("A Type of given value is not a type the query expect");
            }
          }
        }
        return {
          ...state,
          query: {
            [action.name]: {
              value: action.value,
            },
          },
        };
      }
      throw new Error("There's no query which registered with that name");
    case REGISTER_QUERY:
      if (!state.registered.has(action.name)) {
        if (action.expectType) {
          if (!action.initValue?.__type || action.initValue?.__type !== action.expectType) {
            if (typeof action.initValue !== action.expectType) {
              throw new Error("A Type of given initial value is not same as expectType");
            }
          }
        }
        return {
          ...state,
          registered: [...state.registered, action.name],
          query: {
            ...state.query,
            [action.name]: {
              value: action.initValue || null,
              initValue: action.initValue || null,
              expectType: action.expectType || null,
              disabled: false,
            },
          },
        };
      }
      throw new Error("There's already a query which registered with that name");
    case UNREGISTER_QUERY:
      if (state.registered.has(action.name)) {
        state.registered.delete(action.name);
        return {
          ...state,
          registered: state.registered,
          query: {
            [action.name]: undefined,
          },
        };
      }
      throw new Error("There's no query which registered with that name");
    case DISABLE_QUERY:
      if (state.registered.has(action.name)) {
        return {
          ...state,
          query: {
            [action.name]: {
              disabled: action.disabled || !state.query[action.name].disabled,
            },
          },
        };
      }
      throw new Error("There's no query which registered with that name");
    default:
      return state;
  }
};
