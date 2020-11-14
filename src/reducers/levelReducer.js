import {
  FETCH_LEVEL_PENDING,
  FETCH_LEVEL_FUFILLED,
  FETCH_LEVEL_REJECTED,
  UPLOAD_LEVEL_PENDING,
  UPLOAD_LEVEL_FUFILLED,
  UPLOAD_LEVEL_REJECTED,
  TOGGLE_NESTED_MODAL
 } from '../types';


const defaultState = {
  nestedModal : false,
  disabled : false,
  loading : false,
  nestedLoading : false,
  nestedDisabled : false,
  levels : [], //also know as classes
  error : {}
}


export const levelReducer = (state = defaultState, action) => {
   switch(action.type){
    case TOGGLE_NESTED_MODAL:
     return {
             ...state,
             nestedModal : !state.nestedModal
            };
    case UPLOAD_LEVEL_PENDING:
     return {...state, nestedDisabled: true, nestedLoading: true };
    case UPLOAD_LEVEL_FUFILLED:
     return {
              ...state,
              levels : [...state.levels, action.payload],
              nestedLoading : false,
              nestedDisabled : false,
              nestedModal: !state.nestedModal
           };
    case UPLOAD_LEVEL_REJECTED:
     return {
              ...state,
              nestedLoading : false,
              nestedDisabled : false,
              error : action.payload
            };
    case FETCH_LEVEL_PENDING:
     return {
             ...state,
             loading : true
            };
    case FETCH_LEVEL_FUFILLED:
     return {
             ...state,
             levels : action.payload,
             loading : false
            };
    case FETCH_LEVEL_REJECTED:
     return {
             ...state,
             loading : false,
             error : action.payload
            };
    default:
     return state;
   }
}
