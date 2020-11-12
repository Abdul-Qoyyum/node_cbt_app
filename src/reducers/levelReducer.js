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


const defaultState = {
  modal : false,
  nestedModal : false,
  closeAll : false,
  loading : false,
  disabled : false,
  nestedLoading : false,
  nestedDisabled : false,
  levels : [], //also know as classes
  error : {}
}


export const levelReducer = (state = defaultState, action) => {
   switch(action.type){
    case TOGGLE_MODAL:
     return {...state, modal : !state.modal }
    case TOGGLE_NESTED_MODAL:
     return {...state, nestedModal : !state.nestedModal }
    case UPLOAD_LEVEL_PENDING:
     return {...state, loading : true, nestedDisabled: true }
    case UPLOAD_LEVEL_FUFILLED:
     return {...state, levels : [...state.levels, action.payload], loading : false, nestedDisabled : false }
    case UPLOAD_LEVEL_REJECTED:
     return {...state, loading : false, nestedDisabled : false, error : action.payload }
    case FETCH_LEVEL_PENDING:
     return {...state, loading : true }
    case FETCH_LEVEL_FUFILLED:
     return {...state, levels : action.payload, loading : false};
    case FETCH_LEVEL_REJECTED:
     return {...state, loading : false, error : action.payload};
    default:
     return state;
   }
}
