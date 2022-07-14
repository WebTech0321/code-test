import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const middlewares = [thunk];

const store = createStore(
  reducers, 
  {}, 
  applyMiddleware(...middlewares)
);


export default store;