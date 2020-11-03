import axios from 'axios';

import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    SET_ACTIVE_TOKEN,
    CLEAR_LOGIN_ERROR,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAILED
} from "../types";

export function clearError(){
    return dispatch => {
      dispatch({
        type : CLEAR_LOGIN_ERROR,
        payload : null
      })
    }
}


export function verifyToken(emstoken){
    let token;
    return dispatch => {
        axios.get('/api/token/verify',{
            headers : {
                emstoken : emstoken
            }
        })
        .then(res => {
            token = res.headers['emstoken'];
           dispatch({
               type : VERIFY_TOKEN_SUCCESS,
               payload : res.data
           });
        }).catch(err => {
            dispatch({
                type : VERIFY_TOKEN_FAILED,
                payload : err
            })
        })
        .then(() => {
            dispatch({
                type : SET_ACTIVE_TOKEN,
                payload : token
            });
        })
    }
}


export function loginUser(data) {
    let { remember_me } = data;
    let token;
    return dispatch => {
        dispatch({
           type : FETCH_USER_PENDING
        });
        axios.post('/api/login',data)
        .then(res => {
            token = res.headers['emstoken'];
            //store response token to localstorage
            if (remember_me) {
                localStorage.setItem('emstoken',token);
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
        .then(() => {
                dispatch({
                    type : SET_ACTIVE_TOKEN,
                    payload : token
                });
        })
    }
}
