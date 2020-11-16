import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
   Card,
   Row,
   Col,
   CardText,
   Button
  } from 'reactstrap';

import {
    showQuestionOrPreview
} from "../actions";


function SubjectList({lists, path, showQuestionOrPreview }){

    const history = useHistory();

 return (
   <>

         <Row>
             {
                 lists.map(function(list, index){
                     return (
                       <Col key={index} xs={12} sm={6} md={4} className={'mb-3'}>
                          <Card body>
                                <CardText>
                                    <p><strong>Subject Name : </strong> {list.title}</p>
                                    <p><strong>Class : </strong> {list._level.name}</p>
                                    <p><strong>Duration : </strong> {list.duration} (mins)</p>
                                </CardText>
                              <Button className={'bg-primary text-white'}  onClick={() => showQuestionOrPreview(list._id, path, history)}>Select</Button>
                          </Card>
                       </Col>
                     )
                 })
             }
        </Row>

   </>
 )
}

export default connect(null,{ showQuestionOrPreview })(SubjectList);