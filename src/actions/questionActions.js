import axios from 'axios';

import {
    SET_QUESTION,
    SET_OPTION,
    SET_ANSWER,
    UPLOAD_QUESTION_SUCCESS,
    UPLOAD_QUESTION_PENDING,
    UPLOAD_QUESTION_FAILED
    } from "../types";

export const setQuestion = (data) => {
   return dispatch => {
     dispatch({
      type : SET_QUESTION,
      payload : data
     });
   }
}

export const setOption = (e) => {
    return dispatch => {
        dispatch({
            type : SET_OPTION,
            payload : {
                [e.target.name] : e.target.value
            }
        })
    }
}

export const setAnswer = (e) => {
    return dispatch => {
     dispatch({
        type : SET_ANSWER,
        payload : e.target.value
     });
    }
}

export const uploadQuestion = question => {
   return dispatch => {
       dispatch({ type : UPLOAD_QUESTION_PENDING });
       axios.post('/api/ques/upload',question).then(res => {
         console.log(`Saved : ${res.data}`);
         dispatch({
            type : UPLOAD_QUESTION_SUCCESS,
            payload : res.data
         });
       }).catch(err => {
         console.log(err);
         dispatch({
             type : UPLOAD_QUESTION_FAILED,
             payload : err
         });
       });
    }
}
