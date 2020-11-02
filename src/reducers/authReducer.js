import {
    SET_ACTIVE_TOKEN,
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    CLEAR_LOGIN_ERROR,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAILED
} from "../types";

const defaultState = {
    user : {},
    loading: false,
    disabled: false,
    redirect : false,
    isAuthenticated : false,
    token : null,
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
        case SET_ACTIVE_TOKEN:
            return {...state, token : action.payload};
        case FETCH_USER_REJECTED:
            return {...state, loading: false, redirect: false, error: action.payload, disabled : false};
        case CLEAR_LOGIN_ERROR:
            return {...state, error : { ...state.error,  email : { ...state.error.email, message : action.payload }}};
        case VERIFY_TOKEN_SUCCESS:
            return {...state, user: action.payload, isAuthenticated: true, loading: false};
        case VERIFY_TOKEN_FAILED:
            return {...state, user : {}, isAuthenticated: false, loading: false};
        default:
            return state;
    }
}
