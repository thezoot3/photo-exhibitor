import { useSelector, useDispatch } from "react-redux";
import { checkRequireArgs, checkTypeArgs, applyMultipleCheck } from "../utils/arg_check";
import {modifyQuery, registerQuery} from "../redux/queryData";

export default applyMultipleCheck((query, initValue, expectType) => {
    function modifyFunction(dispatch, queryData) {
        if(queryData) {
            return f => {
                if(f.constructor !== Function) {
                    dispatch(modifyQuery(query, f))
                }
                dispatch(modifyQuery(query, f(queryData)))
            }
        }
        return () => {}
    }
    const dispatch = useDispatch();
    const queryData = useSelector(state => {
        return state.query[query]?.value
    });
    if(!queryData) dispatch(registerQuery(query, initValue, expectType))
    return [queryData, modifyFunction(dispatch, queryData)]

}, [checkRequireArgs, [1, 2]], [checkTypeArgs, [Object, String, null, Function]])
