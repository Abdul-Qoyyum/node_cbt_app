import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';

//My customised adapter for CKEditor...
import { MyCustomAdapter } from '../../plugins';

import {
  Container,
  Row,
  Col,
  Card,
 // CardHeader,
  CardBody,
  Input,
  Form,
  FormGroup,
  Button
 } from 'reactstrap';



import {
     setQuestion,
     setOption,
     setAnswer,
     uploadQuestion
       } from "../../actions";

function Questions(props) {
    const {
       A,
       B,
       C,
       D,
       body,
       answer,
       question,
       setQuestion,
       setOption,
       setAnswer,
       uploadQuestion
         } = props;

    let handleSubmit = (data) => {
     console.log(`Data : ${data}`);
     //upload Question...
     uploadQuestion(question);
    }

    return(
     <>
     <div style={{
        minHeight : "80px",
        backgroundColor: "green"
     }}>
     </div>

    {/* Page Content */}
     <Container className={"header pb-8 pt-5 pt-lg-8 d-flex align-items-center"}  fluid>

       <Card className={"bg-secondary shadow"}>
       <Form onSubmit={handleSubmit}  enctype="multipart/form-data">
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onInit ={editor => {
            editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
               return new MyCustomAdapter(loader);
             }
           }}
          onChange={(event, editor) => {
            let data = editor.getData();
            setQuestion(data);
          }}
        />

       <Row>
         <Col md={"6"}>

{/*          <CardHeader className={"bg-white border-0"}> */}
           <h2>Options</h2>
{/*          </CardHeader> */}
          <CardBody>

           <FormGroup>
            <Input type={"text"}  className={"form-control-alternative mb-2"}  name={"A"} onChange={setOption}  value={A} />
            <Input type={"radio"} name={"answer"}  onClick={setAnswer}  value={A}  />
           </FormGroup>

           <FormGroup>
            <Input className={"form-control-alternative mb-2"} type={"text"} name={"B"} onChange={setOption}  value={B} />
            <Input type={"radio"} name={"answer"} onClick={setAnswer}  value={B}  />
           </FormGroup>

           <FormGroup>
            <Input  className={"form-control-alternative mb-2"}  type={"text"} name={"C"} onChange={setOption} value={C}  />
            <Input type={"radio"} name={"answer"} onClick={setAnswer}  value={C}  />
           </FormGroup>

           <FormGroup>
            <Input className={"form-control-alternative mb-2"} type={"text"} name={"D"} onChange={setOption} value={D} />
            <Input type={"radio"} name={"answer"} onClick={setAnswer} value={D} />
           </FormGroup>

          </CardBody>

        </Col>


        <Col md={"6"}>
         <Card className={"bg-secondary shadow"}>
{/*           <CardHeader className={"bg-white border-0"}> */}
             <h2>Answer</h2>
{/*           </CardHeader> */}
           <CardBody>
           <Input type={"text"} className={"form-control-alternative mb-2"}   name={"answer"} value={answer} disabled />
           </CardBody>
         </Card>
        </Col>
         <hr />
       </Row>

    <div className={"d-flex justify-content-end"}>
         <Button className={"btn btn-primary"}>Save</Button>
    </div>
       </Form>
       </Card>
     </Container>
     </>
    );
}


const mapStateToProps = state => {
    const { question } = state.questionStore;
    const { body, options, answer } = question;
    const { A, B, C, D} = options;
    return { A, B, C, D, question, body, answer}
}

export default connect(mapStateToProps,{
       setQuestion,
       setOption,
       setAnswer,
       uploadQuestion
 })(Questions);
