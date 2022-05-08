import reducer from "./cart/reducer";
import { createStore } from "redux";

const store = createStore(reducer);

export default store;
