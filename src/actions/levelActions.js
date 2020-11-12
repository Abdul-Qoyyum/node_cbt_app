import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import {
  FETCH_LEVEL_PENDING,
  FETCH_LEVEL_FUFILLED,
  FETCH_LEVEL_REJECTED,
  SET_LEVEL,
  UPLOAD_LEVEL_PENDING,
  UPLOAD_LEVEL_FUFILLED,
  UPLOAD_LEVEL_REJECTED,
  TOGGLE_MODAL,
  TOGGLE_NESTED_MODAL
  } from '../types';


export const setLevel = () => {


}


export const fetchLevel = () => {
  return dispatch => {
    dispatch({ type : FETCH_LEVEL_PENDING });
    axios.get('/api/level').then(res => {
      dispatch({
       type : FETCH_LEVEL_FUFILLED,
       payload : res.data
      });
    }).catch(err => {
      dispatch({
       type : FETCH_LEVEL_REJECTED,
       payload : err
      });
    });
  }
}

export const uploadLevel = (data, e) => {
   return dispatch => {
      dispatch({ type : UPLOAD_LEVEL_PENDING });
       axios.post('/api/level',data,{
         headers : {
           emstoken : localStorage.getItem('emstoken')
         }
       }).then(res => {

         dispatch({
          type : UPLOAD_LEVEL_FUFILLED,
          payload : res.data
         });
       //flash success message
       NotificationManager.success("Saved");
       //clear the input
        e.target.reset();
      }).catch(err => {
         dispatch({
          type : UPLOAD_LEVEL_REJECTED,
          payload : err
         });
       
      });
   }
}


//used to toggle modal
export const toggle = () => {
  return dispatch => {
    dispatch({ type : TOGGLE_MODAL });
  }
}

export const toggleNested = () => {
  return dispatch => {
   dispatch({ type : TOGGLE_NESTED_MODAL });
  }
}
