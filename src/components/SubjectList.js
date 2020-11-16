import React from 'react';
import { Link } from 'react-router-dom';

import {
   Card,
   Row,
   Col,
   CardBody,
   CardLink,
   CardFooter
  } from 'reactstrap';

export function SubjectList({lists,path}){
 return (
   <>

         <Row>
             {
                 lists.map(function(list, index){
                     return (
                       <Col key={index} xs={12} sm={6} md={4} className={'mb-3'}>
                          <Card>
                              <CardBody>
                                  <p><strong>Subject Name : </strong> {list.title}</p>
                                  <p><strong>Class : </strong> {list._level.name}</p>
                                  <p><strong>Duration : </strong> {list.duration} (mins)</p>
                              </CardBody>
                              <CardFooter>
                                  <CardLink><Link to={`${path}/${list._id}`} className={"text-center"}>Select</Link></CardLink>
                              </CardFooter>
                          </Card>
                       </Col>
                     )
                 })
             }
        </Row>

   </>
 )
}
