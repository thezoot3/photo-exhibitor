import { useSelector, useDispatch } from "react-redux";
import { checkRequireArgs, checkTypeArgs, applyMultipleCheck } from "../utils/arg_check";
import { modifyQuery } from "../redux/queryData";

export default applyMultipleCheck(query => {
    function modifyFunction(dispatch, queryData) {
        if(queryData) {
            return f => {
                if(f.constructor !== Function)  dispatch(modifyQuery(query, f))
                dispatch(modifyQuery(query, f(queryData)))
            }
        }
        return () => {}
    }
    const dispatch = useDispatch();
    const queryData = useSelector(state => {
        return state.query[query]?.value
    });
    return [queryData, modifyFunction(dispatch, queryData)]

}, [checkRequireArgs, [1]], [checkTypeArgs, [String]])
