import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { BookReducers } from "./book/reducers";



const reducers = combineReducers({
    book : BookReducers
});

const initialState = {
    card : {
        cart : localStorage.getItem("cart") ? 
        json.parse(localStorage.getItem("cart")) : []
    }
}

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;