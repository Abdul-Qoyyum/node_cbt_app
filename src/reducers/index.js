import { combineReducers } from "redux";
import { examSessionReducer } from "./examSessionReducer";
import { authReducer } from "./authReducer";
import { questionReducer } from "./questionReducer";
import { levelReducer } from "./levelReducer";

const rootReducer = combineReducers({
   authStore : authReducer,
   questionStore : questionReducer,
   examSessionStore : examSessionReducer,
   levelStore : levelReducer
});

export default rootReducer;
