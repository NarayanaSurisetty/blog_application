import { combineReducers } from "redux";
import { NewPostReducer } from "./newPostReducer";

const Reducers = combineReducers({
    loginData: NewPostReducer,
});

export default Reducers;