import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    CLEAR_LOGIN_ERROR
} from "../types";

const defaultState = {
    user : {},
    loading: false,
    disabled: false,
    redirect : false,
    error : {
      email : {
       message : ""
      }
    }
};


export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {...state, loading: true, redirect: false, disabled : true};
        case FETCH_USER_FUFILLED:
            return {...state, user : action.payload, loading: false, redirect: true, disabled : false, isAuthenticated : true};
        case FETCH_USER_REJECTED:
            return {...state, loading: false, redirect: false, error: action.payload, disabled : false};
        case CLEAR_LOGIN_ERROR:
            return {...state, error : { ...state.error,  email : { ...state.error.email, message : action.payload }}};
        default:
            return state;
    }
}
