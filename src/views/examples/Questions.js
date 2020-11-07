import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

//My customised adapter for CKEditor...
import { MyCustomAdapter } from '../../plugins';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  FormText,
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
        handleSubmit,
        register,
        errors
           } = useForm();

    const {
       A,
       B,
       C,
       D,
       body,
       error,
       answer,
       question,
       setQuestion,
       setOption,
       setAnswer,
       uploadQuestion
         } = props;


    let onSubmit = (data) => {
     console.log(`Data : ${data}`);
     //upload Question...
     uploadQuestion(question);
    };

    return(
     <>
     <div style={{
        minHeight : "80px",
        backgroundColor: "green"
     }}>
     </div>

    {/* Page Content */}
     <Container className={"header pb-8 pt-5 pt-lg-8"}  fluid>

       {/*<Card className={"bg-secondary shadow"}>*/}
       <Form role={"form"} onSubmit={handleSubmit(onSubmit)}  encType={"multipart/form-data"}>
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
            //action creator
            setQuestion(data);
          }}
        />
        {error.body && <FormText color={"danger"}>{error.body.message}</FormText>}

        <Row className={"mt-3"}>

         <Col md={"6"}>
          <CardBody>
               <h2>Options</h2>
           <FormGroup>
             <Row className={'my-auto'}>
              <Col>
               <Input
                type={"text"}
                innerRef={register({
                    required : {
                     value : true,
                     message : "Please specify option"
                    }
                })}
                className={"form-control-alternative mb-2"}
                name={"A"}
                onChange={setOption}
                value={A}/>
               </Col>
               <Col xs={"1"}>
                 <Input type={"radio"} name={"answer"}  onClick={setAnswer}  className={"mt-3"} value={A}  />
               </Col>
             </Row>
              {errors.A && (<FormText color={"danger"}>{errors.A.message}</FormText>)}
            </FormGroup>

           <FormGroup>
            <Input
                className={"form-control-alternative mb-2"}
                innerRef={register({
                    required: {
                     value : true,
                     message : "Please specify option"
                  }
                })}
                type={"text"}
                name={"B"}
                onChange={setOption}
                value={B} />
            <Input type={"radio"} name={"answer"} onClick={setAnswer}  value={B}  />
             {errors.B && (<FormText color={"danger"}>{errors.B.message}</FormText>)}
           </FormGroup>

           <FormGroup>
            <Input
                className={"form-control-alternative mb-2"}
                innerRef={register({
                    required : {
                     value : true,
                     message : "Please specify option"
                    }
                })}
                type={"text"}
                name={"C"}
                onChange={setOption}
                value={C}
            />
            <Input type={"radio"} name={"answer"} onClick={setAnswer}  value={C}  />
             {errors.C && (<FormText color={"danger"}>{errors.C.message}</FormText>)}
           </FormGroup>

           <FormGroup>
            <Input
                className={"form-control-alternative mb-2"}
                innerRef={register({
                    required :{
                     value :true,
                     message : "Please specify option"
                    }
                })}
                type={"text"}
                name={"D"}
                onChange={setOption}
                value={D}
            />
            <Input type={"radio"} name={"answer"} onClick={setAnswer} value={D} />
               {errors.D && (<FormText color={"danger"}>{errors.D.message}</FormText>)}
           </FormGroup>

          </CardBody>

        </Col>


        <Col md={"6"}>

           <CardBody>
               <h2>Answer</h2>
           <Input
               type={"text"}
               className={"form-control-alternative mb-2"}
               innerRef={register({
                   required : {
                    value : true,
                    message : "Please check a box next to an option to set answer"
                   }
               })}
               name={"ans"}
               value={answer}
               disabled/>
             {errors.ans && (<FormText color={"danger"}>{errors.ans.message}</FormText>)}
           </CardBody>
        </Col>
         <hr />
       </Row>

    <div className={"d-flex justify-content-end"}>
         <Button className={"btn btn-primary"}>Save</Button>
    </div>
       </Form>
       {/*</Card>*/}
     </Container>
     </>
    );
}


const mapStateToProps = state => {
    const { error, question } = state.questionStore;
    const { body, options, answer } = question;
    const { A, B, C, D} = options;
    return {
     A,
     B,
     C,
     D,
     question,
     body,
     answer,
     error
     }
}

export default connect(mapStateToProps,{
       setQuestion,
       setOption,
       setAnswer,
       uploadQuestion
 })(Questions);
