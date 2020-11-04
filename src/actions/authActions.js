import axios from 'axios';

import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    CLEAR_LOGIN_ERROR,
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
    let { remember_me } = data;
    return dispatch => {
        dispatch({
           type : FETCH_USER_PENDING
        });
        axios.post('/api/login',data)
        .then(res => {
            //store response token to localstorage
            if (remember_me) {
                localStorage.setItem('emstoken',res.headers['emstoken']);
            }
            dispatch({
                type: FETCH_USER_FUFILLED,
                payload: res.data
          })
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
