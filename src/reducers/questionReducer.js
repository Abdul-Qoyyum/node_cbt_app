import {
     SET_QUESTION,
     SET_OPTION,
     SET_ANSWER,
     UPDATE_QUESTIONS
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
    }
}

export const questionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_QUESTION:
            return {...state, question : {...state.question, body : action.payload }}
        case SET_OPTION:
            return {...state, question  : {  ...state.question , options : {...state.question.options, ...action.payload } } };
        case SET_ANSWER:
            return {...state, question : {...state.question,  answer : action.payload } }
        case UPDATE_QUESTIONS:
            //to be updated soon
            return state;
        default :
            return state;
    }
}
