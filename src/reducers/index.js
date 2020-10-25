import { combineReducers } from "redux";
import { examSessionReducer } from "./examSessionReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
   authStore : authReducer,
   examSessionStore : examSessionReducer
});

export default rootReducer;
