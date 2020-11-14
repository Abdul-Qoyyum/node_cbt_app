import React from 'react';

import {
   Card,
   Row,
   Col
  } from 'reactstrap';

export function SubjectList({lists}){
 return (
   <>

         <Row>
             {
                 lists.map(function(list, index){
                     return (
                       <Col key={index}>
                          <Card>
                              <p>Hello world</p>
                          </Card>
                       </Col>
                     )
                 })
             }
        </Row>

   </>
 )
}
