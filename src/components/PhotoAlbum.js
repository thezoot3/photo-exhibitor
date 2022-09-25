import {createStore} from "redux";
import reducer from '../redux/reducer';
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import PropTypes from "prop-types";
function PhotoAlbum({children}) {
    const store = createStore(reducer, composeWithDevTools());
    return (
        <Provider store={store}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
PhotoAlbum.propTypes = {
    children: PropTypes.any
}
export default PhotoAlbum
