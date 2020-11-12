import React,{ useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { NotificationContainer } from 'react-notifications';


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
  Label,
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
    //declare CKEditor instance
    const [editor, setEditor] = useState(null);

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
       error,
       answer,
       question,
       setQuestion,
       setOption,
       setAnswer,
       uploadQuestion
         } = props;


    let onSubmit = (data, e) => {
     //upload Question...
//takes
     uploadQuestion(question, e, editor);

    };

    return(
     <>
     <div className={"d-none d-md-block bg-success"}  style={{
        minHeight : "80px",
     }}>
     </div>

    {/* Page Content */}
     <Container className={"header pb-8 pt-5 pt-lg-8"}  fluid>

       <Form role={"form"} onSubmit={handleSubmit(onSubmit)}  encType={"multipart/form-data"}>
        <CKEditor
          editor={ClassicEditor}
          config={{placeholder : "Use me to type question"}}
          onInit ={editor => {
          //grab CKEditor instance with hook
            setEditor(editor);
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

        <Card>
        <Row className={"mt-3"}>

         <Col md={"6"}>
          <CardBody>
               <h3>Options</h3>
           <FormGroup>
             <Row>
              <Col>
               <Input
                type={"text"}
                innerRef={register({
                    required : {
                     value : true,
                     message : "Option is required"
                    }
                })}
                name={"A"}
                invalid={errors.A ? true : false}
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
            <Row>
                <Col>
            <Input
                type={"text"}
                innerRef={register({
                    required: {
                     value : true,
                     message : "Option is required"
                  }
                })}
                name={"B"}
                invalid={errors.B ? true : false}
                onChange={setOption}
                value={B} />
                </Col>
                <Col xs={"1"}>
                  <Input type={"radio"} name={"answer"} onClick={setAnswer}  className={"mt-3"} value={B}  />
                </Col>
            </Row>
             {errors.B && (<FormText color={"danger"}>{errors.B.message}</FormText>)}
           </FormGroup>

           <FormGroup>
               <Row>
                   <Col>
            <Input
                innerRef={register({
                    required : {
                     value : true,
                     message : "Option is required"
                    }
                })}
                type={"text"}
                name={"C"}
                invalid={errors.C ? true : false}
                onChange={setOption}
                value={C}
            />
                   </Col>
                   <Col xs={"1"}>
            <Input type={"radio"} name={"answer"} onClick={setAnswer} className={"mt-3"}  value={C}  />
                   </Col>
               </Row>
            {errors.C && (<FormText color={"danger"}>{errors.C.message}</FormText>)}
           </FormGroup>

           <FormGroup>
               <Row>
                   <Col>
            <Input
                innerRef={register({
                    required :{
                     value :true,
                     message : "Option is required"
                    }
                })}
                type={"text"}
                invalid={errors.D ? true : false}
                name={"D"}
                onChange={setOption}
                value={D}
            />
                   </Col>
                   <Col xs={"1"}>
            <Input type={"radio"} name={"answer"} onClick={setAnswer} className={'mt-3'} value={D} />
                   </Col>
               </Row>
            {errors.D && (<FormText color={"danger"}>{errors.D.message}</FormText>)}
           </FormGroup>

          </CardBody>

        </Col>


        <Col md={"6"}>

         <CardBody>
           <h3>Answer</h3>
             <FormGroup>
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
             </FormGroup>


             <FormGroup>
                 <Label for="exampleSelect"><h3>Class</h3></Label>
                 <Input
                     type="select"
                     name="level"
                     onChange={(e) => console.log(`Clicked ${e.target.value}`)}
                     id="level"
                     innerRef={register({
                         required : {
                             value : true,
                             message : "Class is required"
                         }
                     })}
                 >
                     <option></option>
                     <option>JSS 2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                 </Input>
                 {errors.level && <FormText color={"danger"}>{errors.level.message}</FormText> }
             </FormGroup>

           </CardBody>
        </Col>
         <hr />
       </Row>
            <div className={"d-flex justify-content-end pr-4 pb-4"}>
                <Button className={"btn btn-primary"}>Upload</Button>
            </div>
        </Card>
       </Form>
     </Container>
     <NotificationContainer/>
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
