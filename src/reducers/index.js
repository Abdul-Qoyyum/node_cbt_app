import { combineReducers } from "redux";
import { examSessionReducer } from "./examSessionReducer";
import { authReducer } from "./authReducer";
import { QuestionReducer } from "./QuestionReducer";

const rootReducer = combineReducers({
   authStore : authReducer,
   questionStore : QuestionReducer,
   examSessionStore : examSessionReducer
});

export default rootReducer;
