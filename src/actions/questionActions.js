import axios from 'axios';

import {
    SET_QUESTION,
    SET_OPTION,
    SET_ANSWER

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
       axios.post('/api/ques/save',question).then(res => {

       }).catch(err => {

       });
    }
}
