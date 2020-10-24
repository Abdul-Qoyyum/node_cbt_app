import axios from 'axios';

import {
    FETCH_USER_PENDING,
    FETCH_USER_FUFILLED,
    FETCH_USER_REJECTED
} from "../types";

export function loginUser(data) {
    return dispatch => {
        dispatch({
           type : FETCH_USER_PENDING
        });
        axios.post('/api/login',data).then(res => {
          dispatch({
              type: FETCH_USER_FUFILLED,
              payload: res.data
          })
        }).catch(err => {
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
