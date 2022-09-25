import {checkTypeArgs, checkRequireArgs, applyMultipleCheck} from '../utils/arg_check'
import typeChecker from '../utils/typeChecker'
const MODIFY_QUERY = "MODIFY_QUERY";
const REGISTER_QUERY = "REGISTER_QUERY";
const UNREGISTER_QUERY = "UNREGISTER_QUERY";
const DISABLE_QUERY = "DISABLE_QUERY";
const default_query = {
    registered: new Set(),
    query: {}
}
export const modifyQuery = applyMultipleCheck((query, value) => {
    return {
        type: MODIFY_QUERY,
        query,
        value
    }

}, [checkRequireArgs, [1, 2]], [checkTypeArgs, [String, null]])
export const registerQuery = applyMultipleCheck((query, initValue, expectType) => {
    return {
        type: REGISTER_QUERY,
        query,
        initValue,
        expectType
    }
}, [checkRequireArgs, [1]], [checkTypeArgs, [String, null, Function]])
export const unregisterQuery = applyMultipleCheck(query => {
    return {
        type: UNREGISTER_QUERY,
        query
    }
}, [checkRequireArgs, [1]], [checkTypeArgs, [String]])
export const disableQuery = applyMultipleCheck((query, disabled) => {
    return{
        type: DISABLE_QUERY,
        query,
        disabled
    }
}, [checkRequireArgs, [1]], [checkTypeArgs, [String, Boolean]])

export const reducer = (state = default_query, action) => {
    switch(action.type) {
        case MODIFY_QUERY:
            if(state.registered.has(action.query)) {
                let expType = state.query[action.query].expectType
                if(expType) {
                    if(!typeChecker(expType, action.value)) {
                        throw new Error('A Type of given value is not a type the query expect')
                    }
                }
                return {
                    ...state,
                    query: {
                        [action.query]: {
                            value: action.value
                        }
                    }
                }
            }
            throw new Error("There's no query which registered with that name")
        case REGISTER_QUERY:
            if(!state.registered.has(action.query)) {
                if(!typeChecker(action.expectType, action.initValue)) {
                    throw new Error('A Type of given initial value is not same as expectType')
                }
                let set = Array.from(state.registered);
                return {
                    ...state,
                    registered: new Set([...set, action.query]),
                    query: {
                        [action.query]: {
                            value: action.initValue || null,
                            initValue: action.initValue || null,
                            expectType: action.expectType || null,
                            disabled: false
                        }
                    }
                }
            }
            throw new Error("There's already a query which registered with that name")
        case UNREGISTER_QUERY:
            if(state.registered.has(action.query)) {
                const set = new Set(state.registered);
                set.delete(action.query)
                return {
                    ...state,
                    registered: set,
                    query: {
                        [action.query]: undefined
                    }
                }
            }
            throw new Error("There's no query which registered with that name")
        case DISABLE_QUERY:
            if(state.registered.has(action.query)) {
                return {
                    ...state,
                    query: {
                        [action.query]: {
                            disabled: action.disabled || !state.query[action.query].disabled
                        }
                    }
                }
            }
            throw new Error("There's no query which registered with that name")
        default:
            return state;
    }
}
