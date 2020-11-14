import React from 'react';
import {
   Card
  } from 'reactstrap';

function Empty(){
return(
  <Card style={{ minHeight : '60vh'}}  className={'d-flex justify-content-center  align-items-center'}>
   <div>
    <h4 className={"text-primary"}>Empty</h4>
     <p className={"text-center text-primary"} style={{fontSize : 30 }}>
        <i className="fa fa-folder-open" aria-hidden="true"></i>
     </p>
   </div>
  </Card>
);
 }

export default Empty;
