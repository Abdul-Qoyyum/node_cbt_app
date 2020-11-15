import axios from 'axios';

//manage route with history
import history from '../history';

import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED,
    CLEAR_LOGIN_ERROR,
    VERIFY_JWT_TOKEN_SUCCESS,
    VERIFY_JWT_TOKEN_FAIL
} from "../types";

export function clearError(){
    return dispatch => {
      dispatch({
        type : CLEAR_LOGIN_ERROR,
        payload : null
      })
    }
}

export function verifyToken(){
  return dispatch => {
    axios.get('api/token/verify',{
     headers : {
      emstoken : localStorage.getItem("emstoken")
     }
    }).then(res => {
     dispatch({ type : VERIFY_JWT_TOKEN_SUCCESS });
     history.push("/admin/index");
    }).catch(err => {
     dispatch({ type : VERIFY_JWT_TOKEN_FAIL  });
    //redirect to login page if
    //verification fail
     history.push("/auth");
    });
  }
}


export function loginUser(data) {
    return dispatch => {
        dispatch({
           type : FETCH_USER_PENDING
        });
        axios.post('/api/login',data)
        .then(res => {
            //store response token to localstorage
            localStorage.setItem('emstoken',res.headers['emstoken']);

            dispatch({
                type: FETCH_USER_FUFILLED,
                payload: res.data
          })

           //redirect to dashboard
           history.push("/admin/index");
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
