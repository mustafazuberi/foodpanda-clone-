import { combineReducers } from "redux";
import authInfo from "./authInfo";
import isLoggined from "./isAuthenticated";

const reducers = combineReducers ({
    myAuth : authInfo,
    myAuthLoggined : isLoggined
})
export default reducers