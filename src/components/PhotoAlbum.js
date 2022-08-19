import {createStore} from "redux";
import { reducer as photoReducer } from '../redux/photoAlbum';
import {Provider} from "react-redux";
function PhotoAlbum({fetchData = () => {}, children, autoFetch = true}) {
    const store = createStore(photoReducer)
    store.subscribe(state => {})
    return (
        <Provider store={store}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
export default PhotoAlbum
