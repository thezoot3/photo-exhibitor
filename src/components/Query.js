import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {useEffect} from "@types/react";
import {registerQuery, unregisterQuery} from "../redux/queryData";

function Query({key, initValue, expectType, children}) {
    let dispatch = useDispatch();
    useEffect(()=> {
        dispatch(registerQuery(key, initValue, expectType))
        return () => {
            dispatch(unregisterQuery(key))
        }
    }, [expectType, initValue, key])
    return children.constructor === Array ? children : [children]
}
Query.propTypes = {
    key: PropTypes.string.isRequired,
    initValue: PropTypes.any,
    expectType: PropTypes.func
}
Query.defaultProps = {
    initValue: null,
    expectType: null
}
export default Query
