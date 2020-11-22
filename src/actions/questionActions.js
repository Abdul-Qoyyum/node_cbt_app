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
    CLEAR_QUESTION__ERROR,
    SET_SUBJECT_ID,
    FETCH_QUESTIONS_PENDING,
    FETCH_QUESTIONS_FUFILLED,
    FETCH_QUESTIONS_REJECTED,
    SELECT_ANSWER
} from "../types";

//select Answer during exam session
export const selectAnswer = (e) => {
  let { name, value } = e.target;
  return dispatch => {
    dispatch({
      type : SELECT_ANSWER,
      payload : {
       name,
       value
      }
    });
  }
}



//fetch all questions attributed to a subject
//at parameter _subject (i.e subject id)
export const fetchQuestions = (_subject) => {
  return dispatch => {
      dispatch({ type : FETCH_QUESTIONS_PENDING });
       axios.get(`/api/ques/${_subject}`,{
           headers : {
               emstoken : localStorage.getItem('emstoken')
           }
       }).then(res => {
          dispatch({
             type : FETCH_QUESTIONS_FUFILLED,
             payload : res.data
          });
       }).catch(err => {
           dispatch({
               type : FETCH_QUESTIONS_REJECTED,
               payload : err
           })
       });
  }
};

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
};

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
       axios.post('/api/ques',question,{
          headers : {
           emstoken : localStorage.getItem('emstoken')
          }
        }).then(res => {
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
         dispatch({
             type : UPLOAD_QUESTION_FAILED,
             payload : err
         });
       });
    }
};

//sets subjectId for the question to upload
//redirects to the page for the upload question
//or exam view page
export const showQuestionOrPreview = (_id, path, history) => {
    return dispatch => {
        dispatch({
            type : SET_SUBJECT_ID,
            payload : _id
        });
        //renders the question interface
        history.push(`${path}`);
    }
}
