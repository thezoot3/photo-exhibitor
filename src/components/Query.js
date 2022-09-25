import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {registerQuery, unregisterQuery} from "../redux/queryData";

function Query({name, initValue, expectType, children = []}) {
    let dispatch = useDispatch();
    useEffect(()=> {
        dispatch(registerQuery(name, initValue, expectType))
        return () => {
            dispatch(unregisterQuery(name))
        }
    }, [dispatch, expectType, initValue, name])
    return children.constructor === Array ? children : [children]
}
Query.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    initValue: PropTypes.any,
    expectType: PropTypes.func
}
Query.defaultProps = {
    initValue: null,
    expectType: null
}
export default Query
