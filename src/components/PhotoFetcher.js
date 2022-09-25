import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearImages, setImages} from "../redux/photoAlbum";
function PhotoFetcher({fetchData = () => {}, autoFetch = true}) {
    const dispatch = useDispatch()
    const query = useSelector(i => {
        return i.photoReducer["query"];
    })
    useEffect(() => {
        if(autoFetch) {
            dispatch(setImages(fetchData(query)))
        }
        return () => {
            dispatch(clearImages());
        }
    }, [query, autoFetch, fetchData, dispatch])
}
export default PhotoFetcher;
