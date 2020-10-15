import React, { useState, useEffect} from 'react';

export function Timer(){
  let [duration, setDuration] = useState("0:00");

  useEffect(() => {
   let end = Date.now() + (1 * 60 * 1000);
   let interval = setInterval(function(){
    let start = Date.now();
    let total = end - start;
    let secs = Math.floor((total/1000) % 60);
    let mins = Math.floor((total/1000/60) % 60);
    let formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
   if(total <= 0){
    return clearInterval(interval);
   }
     setDuration(`${mins}:${formattedSecs}`);
   },1000);
  },[]);

  return (
   <>
    <p>You are currently running in {process.env.NODE_ENV} mode.</p>
    <p>Time left : {duration}</p>
   </>
  );
}


