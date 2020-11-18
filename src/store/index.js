import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const enhancer = composeWithDevTools();

const store = createStore(reducer, enhancer);

export default store;
