import { combineReducers } from "redux";
import { examSessionReducer } from "./examSessionReducer";
import { authReducer } from "./authReducer";
import { questionReducer } from "./questionReducer";

const rootReducer = combineReducers({
   authStore : authReducer,
   questionStore : questionReducer,
   examSessionStore : examSessionReducer
});

export default rootReducer;
