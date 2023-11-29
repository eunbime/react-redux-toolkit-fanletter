import { createStore, combineReducers } from "redux";
import letters from "redux/modules/letters";
import member from "redux/modules/member";

const rootReducer = combineReducers({ letters, member });

const store = createStore(rootReducer);

export default store;
