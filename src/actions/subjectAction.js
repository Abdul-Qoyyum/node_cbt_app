import axios from 'axios';
import { NotificationManager } from 'react-notifications';


import {
  TOGGLE_MODAL,
  UPLOAD_SUBJECT_PENDING,
  UPLOAD_SUBJECT_FUFILLED,
  UPLOAD_LEVEL_REJECTED,
  FETCH_SUBJECT_PENDING,
  FETCH_SUBJECT_FUFILLED,
  FETCH_SUBJECT_REJECTED
 } from '../types'

/*
export const fetchLevels = () => {
   return dispatch => {
     dispatch({ type : FETCH_SUBJECT_PENDING });
     axios.get()

   }
}*/

export function uploadSubject(data, e){
   return dispatch => {
    dispatch({ type : UPLOAD_SUBJECT_PENDING });
     axios.post('/api/subject',data,{
       headers : {
        emstoken : localStorage.getItem('emstoken')
       }
     }).then(res => {
        dispatch({
          type : UPLOAD_SUBJECT_FUFILLED,
          payload : res.data
        });
       //reset form data
//     e.target.reset();
      //flash success message
      NotificationManager.success("Saved");
     }).catch(err => {
        dispatch({
          type : UPLOAD_LEVEL_REJECTED,
          payload : err
        });
     });
   }

}


//Toggle modal
export const toggle = () => {
  return dispatch => {
    dispatch({ type : TOGGLE_MODAL });
  }
}