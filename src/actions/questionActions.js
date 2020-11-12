import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
    SET_QUESTION,
    SET_OPTION,
    SET_ANSWER,
    UPLOAD_QUESTION_SUCCESS,
    UPLOAD_QUESTION_PENDING,
    UPLOAD_QUESTION_FAILED,
    UPLOAD_QUESTION_ERROR,
    CLEAR_QUESTION__ERROR
    } from "../types";



export const setQuestion = (data) => {
   return dispatch => {
    if(data !== null){
       dispatch({
           type : CLEAR_QUESTION__ERROR,
           payload : {
               body : {
                 message : null
               }
           }
       });
     }

     return  dispatch({
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

export const uploadQuestion = (question, e, editor) => {
   return dispatch => {
//stop execution if the question
//body is not filled
     if(question.body === null){
        return dispatch({
          type : UPLOAD_QUESTION_ERROR,
          payload : {
           body : {
            message : "Question is required"
           }
          }
        });
      }

       dispatch({ type : UPLOAD_QUESTION_PENDING });
       axios.post('/api/ques/upload',question,{
          headers : {
           emstoken : localStorage.getItem('emstoken')
          }
        }).then(res => {
         console.log(`Saved : ${res.data}`);
         NotificationManager.success('Saved');
         //reset the form with the event object
         e.target.reset();
         //clear the editor's data
         editor.setData('');
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
};
