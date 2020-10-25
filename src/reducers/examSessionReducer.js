import {
    FETCH_QUESTIONS_PENDING,
    FETCH_QUESTIONS_FUFILLED,
    FETCH_QUESTIONS_REJECTED
} from "../types";

const initialState = {
    questions : [],
    selected : {},
    loading : false
}

export const examSessionReducer = (state = initialState, action) => {
   switch (action.type) {
       case FETCH_QUESTIONS_PENDING:
           return {...state, loading: true};
       case FETCH_QUESTIONS_FUFILLED:
           return {...state, questions: action.payload, loading: false}
       case FETCH_QUESTIONS_REJECTED:
           return {...state, loading: false}
       default :
           return state
   }
}

