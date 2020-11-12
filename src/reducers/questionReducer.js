import {
     SET_QUESTION,
     SET_OPTION,
     SET_ANSWER,
     UPLOAD_QUESTION_SUCCESS,
     UPLOAD_QUESTION_PENDING,
     UPLOAD_QUESTION_FAILED,
     UPLOAD_QUESTION_ERROR,
     CLEAR_QUESTION__ERROR
     } from "../types";

const defaultState = {
    questions : [],
    question : {
     body : null,
     options : {
        A : null,
        B : null,
        C : null,
        D : null
     },
     answer : null
    },
    loading : false,
    error : {
      body : {
       message : null
      }
    }
}

export const questionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_QUESTION:
            return {...state, question : {...state.question, body : action.payload }}
        case SET_OPTION:
            return {...state, question  : {  ...state.question , options : {...state.question.options, ...action.payload } } };
        case SET_ANSWER:
            return {...state, question : {...state.question,  answer : action.payload } };
        case UPLOAD_QUESTION_PENDING:
            return {...state, loading: true};
        case UPLOAD_QUESTION_SUCCESS:
            return {
              ...state,
              loading : false,
              question : {
               ...state.question,
               body : null,
               options : {
                ...state.question.options,
                A : null,
                B : null,
                C : null,
                D : null
               },
              answer : null
              }
            };
        case UPLOAD_QUESTION_FAILED:
            return state;
        case UPLOAD_QUESTION_ERROR:
            return {...state, error : {...state.error , ...action.payload } };
        case CLEAR_QUESTION__ERROR:
            return {...state, error: {...state.error, ...action.payload}}
        default :
            return state;
    }
}
