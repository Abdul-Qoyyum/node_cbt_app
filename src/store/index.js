import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import rootReducer from "../reducers";

const store = createStore(
     rootReducer,
    {},
     applyMiddleware(thunk , promise)
    );

export default store;