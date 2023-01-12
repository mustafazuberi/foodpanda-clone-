import { combineReducers } from "redux";
import authInfo from "./authInfo";
import isLoggined from "./isAuthenticated";
import resturants from "./resturants"
import isResturant from "./isResturant"
const reducers = combineReducers({
    myAuth: authInfo,
    myAuthLoggined: isLoggined,
    myResturants: resturants,
    myIsResturants: isResturant,
})
export default reducers