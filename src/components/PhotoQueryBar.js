import {useDispatch, useSelector} from 'react-redux'
import {setQuery} from "../redux/photoAlbum";
import {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
function PhotoQueryBar({procFunction, children = []}) {
    const dispatch = useDispatch()
    const query = useSelector(i => {
        return i.queryReducer
    })
    useEffect(() => {
        let mergedQuery = {};
        query.registered.forEach(i => {
            if(!query.query[i].disabled) mergedQuery[i] = query.query[i].value
        })
        if(procFunction) {
            dispatch(setQuery(procFunction(mergedQuery)))
        } else {
            dispatch(setQuery(mergedQuery))
        }
    }, [dispatch, procFunction, query])
    return (
        <Fragment>
            {children.constructor === Array ? children : [children]}
        </Fragment>
    )
}
PhotoQueryBar.propTypes = {
    procFunction: PropTypes.func,
    children: PropTypes.any
}
export default PhotoQueryBar
