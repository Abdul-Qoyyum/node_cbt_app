import axios from 'axios';

import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    SET_ACTIVE_TOKEN,
    CLEAR_LOGIN_ERROR
} from "../types";

export function clearError(){
    return dispatch => {
      dispatch({
        type : CLEAR_LOGIN_ERROR,
        payload : null
      })
    }
}

export function loginUser(data) {
    return dispatch => {
        dispatch({
           type : FETCH_USER_PENDING
        });
        axios.post('/api/login',data)
        .then(res => {
          dispatch({
              type: FETCH_USER_FUFILLED,
              payload: res.data
          })
        })
        .then(res => {
         dispatch({
             type : SET_ACTIVE_TOKEN,
             payload : res.headers['emstoken']
          });
        })
        .catch(err => {
            dispatch({
                type : FETCH_USER_REJECTED,
                payload: {
                    email : {
                        message : "Invalid Credentials"
                    }
                }
            })
        })
    }
}
