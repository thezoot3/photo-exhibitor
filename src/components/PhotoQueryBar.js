import {Provider, useDispatch} from 'react-redux'
import {createStore} from 'redux'
import {reducer as queryReducer} from "./redux/queryData";
function PhotoQueryBar({children}) {
    const dispatch = useDispatch();
    const queryStore = createStore(queryReducer);
    queryStore.subscribe(queryListener);
    function queryListener() {
        let query = queryStore.getState();
        let procdQuery = {};
        query.registered.forEach(i => {
            if(!query.query[i].disabled) procdQuery[i] = query.query[i].value
        })
        dispatch(procdQuery)
    }
    return (
        <Provider store={queryStore}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
export default PhotoQueryBar
