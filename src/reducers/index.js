import { combineReducers } from "redux";
import { examSessionReducer } from "./examSessionReducer";
import { authReducer } from "./authReducer";
import { questionReducer } from "./questionReducer";
import { levelReducer } from "./levelReducer";
import { subjectReducer } from "./subjectReducer";


const rootReducer = combineReducers({
   authStore : authReducer,
   questionStore : questionReducer,
   examSessionStore : examSessionReducer,
   levelStore : levelReducer,
   subjectStore : subjectReducer
});

export default rootReducer;
