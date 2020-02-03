import {combineReducers} from "redux";
import {guestReduser} from "./guests";

export default combineReducers({guests: guestReducer})


