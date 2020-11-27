import axios from 'axios';
import { size } from 'lodash';
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
    SET_SUBJECT,
    FETCH_QUESTIONS_PENDING,
    FETCH_QUESTIONS_FUFILLED,
    FETCH_QUESTIONS_REJECTED,
    SELECT_ANSWER,
    SUBMIT_EXAM_PENDING,
    SUBMIT_EXAM_FUFILLED,
    FETCH_SUBJECT_REJECTED,
    SUBMIT_EXAM_REJECTED,
    START_EXAM_PENDING,
    START_EXAM_FUFILLED,
    START_EXAM_REJECTED
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
};



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
};

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

//sets selected subject object for the question to upload
//redirects to the page for the upload question
//or exam view page
export const showQuestionOrPreview = (subject, path, history) => {
    return dispatch => {
        dispatch({
            type : SET_SUBJECT,
            payload : subject
        });
        //fetch questions for the subject here

        //renders the question interface
        history.push(`${path}`);
    }
};

//Initialize the examination process by saving the initial record
export function startExamSession(_subject, history){
   return dispatch => {
       dispatch({
           type : START_EXAM_PENDING
       });
       axios.post('/api/exam/submit',{
           _subject,
           score : 0 //initial score defaults to zero
       }, {
           headers : {
               emstoken : localStorage.getItem('emstoken')
           }
       }).then(res => {
           dispatch({
               type : START_EXAM_FUFILLED,
               payload : res.data
           });
           //redirects to the cbt session
           history.push('/exam/session');
       }).catch(err => {
           dispatch({
               type :START_EXAM_REJECTED,
               payload : err
           })
       });
   }
}


//calculate the user's score and save it
export function calculateScoreAndSubmitExam(_subject, data, history) {
    let total = 0;
    return dispatch => {
        dispatch({ type : SUBMIT_EXAM_PENDING });
        data.map((ques, index) => {
            //increase the total score if the answer is correct
            if(ques.answer === ques.selectedAnswer){
                total = total + 1;
            }
        });
        let score = (total / size(data)) * 100;
        axios.post('/api/exam/submit',{
           _subject, score
        },{
            headers : {
                emstoken : localStorage.getItem('emstoken')
            }
        }).then(res => {
            dispatch({
                type : SUBMIT_EXAM_FUFILLED,
                payload : res.data
            })
            history.push('/exam');
        }).catch(err => {
            dispatch({
                type : SUBMIT_EXAM_REJECTED,
                payload : err
            })
        });
    }
}
