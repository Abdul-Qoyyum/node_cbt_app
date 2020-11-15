import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    CLEAR_LOGIN_ERROR,
    VERIFY_JWT_TOKEN_SUCCESS,
    VERIFY_JWT_TOKEN_FAIL
} from "../types";

const defaultState = {
    user : {},
    loading: false,
    disabled: false,
    redirect : false,
    isLoading : true, //hide app content until jwt is verified
    error : {
      email : {
       message : ""
      }
    }
};


export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case VERIFY_JWT_TOKEN_SUCCESS:
            return {...state, isLoading : false }
        case VERIFY_JWT_TOKEN_FAIL:
            return {...state, isLoading : false }
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
