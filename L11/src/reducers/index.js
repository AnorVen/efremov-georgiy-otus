import {combineReducers} from "redux";
import {guestReducer} from "./guests";
import {userReducer} from "./user";

export default combineReducers({guests: guestReducer, user: userReducer})


