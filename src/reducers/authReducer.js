import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED
} from "../types";

const initialState = {
    user : {},
    loading: false,
    redirect : false,
    error : {
      email : {
       message : ""
      }
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {...state, loading: true, redirect: false};
        case FETCH_USER_FUFILLED:
            return {...state, user : action.payload, loading: false, redirect: true};
        case FETCH_USER_REJECTED:
            return {...state, loading: false, redirect: false, error: action.payload}
        default:
            return state;
    }
}
