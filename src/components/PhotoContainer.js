import {useSelector} from "react-redux";
import React from "react";
function PhotoContainer({sort, element}) {
    const l = useSelector(state => {
        return state.photoReducer.images
    });
    if(sort) l.sort(sort);
    return l.map((data, i) => {
        return React.cloneElement(element, {photoData: data, key: i});
    })
}
export default PhotoContainer
