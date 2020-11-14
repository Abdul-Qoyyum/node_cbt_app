import {
      TOGGLE_MODAL,
      UPLOAD_SUBJECT_PENDING,
      UPLOAD_SUBJECT_FUFILLED,
      UPLOAD_LEVEL_REJECTED,
      FETCH_SUBJECT_FUFILLED,
      FETCH_SUBJECT_REJECTED
       } from '../types';


const defaultState = {
  modal : false,
  loading : false,
  disabled : false,
  isLoading : true,
  subjects : []
}


export const subjectReducer = (state = defaultState, action) => {
 switch(action.type){
  case TOGGLE_MODAL:
     return {
             ...state,
             modal : !state.modal
            };
  case UPLOAD_SUBJECT_PENDING:
     return {
             ...state,
             loading : true,
             disabled : true
             }
  case UPLOAD_SUBJECT_FUFILLED:
     return {
             ...state,
             subjects : [ action.payload , ...state.subjects ],
             modal : !state.modal,
             loading : false,
             disabled : false
            }
  case UPLOAD_LEVEL_REJECTED:
     return {
             ...state,
             loading : false,
             disabled : false
            };
     case FETCH_SUBJECT_FUFILLED:
      return {
          ...state,
          subjects: action.payload,
          isLoading: false
      };
     case FETCH_SUBJECT_REJECTED:
         return { ...state, isLoading: false };
  default:
    return state;
  }

 }
