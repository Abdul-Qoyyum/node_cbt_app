import React, { useState, useEffect} from 'react';
import axios from 'axios';

export function Pagination(props){
 let [state, setState] = useState({
   data : [ ],
   currentData : {
     email : ""
   }
 });

//extract this to higher order component
useEffect((state) => {
  axios.get('/api').then(res => {
   let { data } = res;

   setState(prevState => {
    return {
      ...prevState,
      data,
      currentData : {
        email : data[0].email
       }
      }
   });

  }).catch(err => {
   console.log(err);
  });
},[]);


 const handlePageChange = (e) => {
  let { value } = e.target;
  let { data } = state;
  let end = value + 1;
  let currentData = data.slice(value, end)[0];

  setState(prevState => {
   return {
   ...prevState,
   currentData
   }
  });

 }


 const paginate = (data,dataPerPage) => {
   let totalPages = Math.ceil(data.length / dataPerPage);
   let paginatedPages = [];
   for(let i = 1; i <= totalPages; i++){
    paginatedPages.push(i);
   }
   return paginatedPages;
 };

return (
  <>
   <p>{state.currentData.email}</p>
   <p>Pages : { paginate(state.data,1).length}</p>
   <p>{ paginate(state.data,1).map((page, index) => (
     <button
       value={index}
       onClick={handlePageChange}
       key={index}
      >
     {page}
     </button>
    ))
     }</p>
  </>
);

}
