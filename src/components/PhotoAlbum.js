import {createStore} from "redux";
import { reducer as photoReducer, setFetcher } from '../redux/photoAlbum';
import {Provider} from "react-redux";
function PhotoAlbum({fetchData = () => {}, children, autoFetch = true}) {
    const store = createStore(photoReducer)
    const fetcher = () => {
        fetchData(store.getState().query)
    }
    store.subscribe(state => {
        if(autoFetch) fetchData(state.query)
    })
    
    store.dispatch(setFetcher(fetcher));
    return (
        <Provider store={store}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
export default PhotoAlbum
