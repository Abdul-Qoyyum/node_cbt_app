import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input
 } from 'reactstrap';

function Questions() {
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
           <Input className={"mb-2"} type={"text"} name={"A"} />
           <Input className={"mb-2"} type={"text"} name={"B"} />
           <Input className={"mb-2"} type={"text"} name={"C"} />
           <Input className={"mb-2"} type={"text"} name={"D"} />
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

export default Questions;
