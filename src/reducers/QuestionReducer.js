import { SET_OPTION } from "../types";

const defaultState = {
    options : {
        A : null,
        B : null,
        C : null,
        D : null
    },
    answer : ""
}

export const QuestionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_OPTION:
            console.log(state)
            return {...state, options : {...state.options, ...action.payload}};
        default :
            return state;
    }
}