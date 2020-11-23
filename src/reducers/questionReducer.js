import {
     SET_QUESTION,
     SET_OPTION,
     SET_ANSWER,
     UPLOAD_QUESTION_SUCCESS,
     UPLOAD_QUESTION_PENDING,
     UPLOAD_QUESTION_FAILED,
     UPLOAD_QUESTION_ERROR,
     CLEAR_QUESTION__ERROR,
     SET_SUBJECT,
     FETCH_QUESTIONS_PENDING,
     FETCH_QUESTIONS_FUFILLED,
     FETCH_QUESTIONS_REJECTED,
     SELECT_ANSWER
     } from "../types";

const defaultState = {
    _subject : null,
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
    isLoading : false, //page loading
    loading : false, //button loading
    error : {
      body : {
       message : null
      },
    msg : {}
    }
}

export const questionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_PENDING:
            return { ...state, isLoading: true};
        case FETCH_QUESTIONS_FUFILLED:
            return { ...state, isLoading: false, questions: action.payload };
        case FETCH_QUESTIONS_REJECTED:
            return { ...state, error : { ...state.error, msg : action.payload } };
        case SET_SUBJECT :
            return { ...state, _subject: action.payload };
        case SET_QUESTION:
            return {...state, question : {...state.question, body : action.payload }};
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
            return {...state, error: { ...state.error, msg : action.payload } };
        case UPLOAD_QUESTION_ERROR:
            return {...state, error : {...state.error , ...action.payload } };
        case CLEAR_QUESTION__ERROR:
            return {...state, error: {...state.error, ...action.payload}};
        case SELECT_ANSWER:
            state.questions[action.payload.name].selectedAnswer = action.payload.value;
            return state;
        default :
            return state;
    }
};
