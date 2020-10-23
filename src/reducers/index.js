import { combineReducers } from "redux";
import { examReducer } from "./examReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
   authStore : authReducer,
   examStore : examReducer
});

export default rootReducer;