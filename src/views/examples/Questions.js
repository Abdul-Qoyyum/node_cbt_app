import React from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input
 } from 'reactstrap';

import { setOption } from "../../actions";

function Questions(props) {
    const { setOption, A, B, C, D } = props;

    return(
     <Container fluid>
      <div className={"mt-7"}>
       <Row>
         <Col md={"6"}>
         <Card>
          <CardHeader>
           <h2>Set Options</h2>
          </CardHeader>
          <CardBody>
           <Input className={"mb-2"} type={"text"}  name={"A"} onChange={setOption} />
           <Input className={"mb-2"} type={"text"} name={"B"} onChange={setOption} />
           <Input className={"mb-2"} type={"text"} name={"C"} onChange={setOption} />
           <Input className={"mb-2"} type={"text"} name={"D"} onChange={setOption} />
          </CardBody>
         </Card>
        </Col>
        <Col md={"6"}>
         <Card>
           <CardHeader>
             <h2>Choosen Answer</h2>
           </CardHeader>
           <CardBody>
           <Input type={"text"} name={"answer"} />
           </CardBody>
         </Card>
        </Col>
       </Row>

      </div>
     </Container>
    );
}


const mapStateToProps = state => {
    const { options, answer } = state.questionStore;
    const { A, B, C, D} = options;
    return { A, B, C, D, answer}
}
export default connect(mapStateToProps,{ setOption })(Questions);
