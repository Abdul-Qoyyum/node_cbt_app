import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';

import LoadingButton from "../../components/LoadingButton";

import {
        RenderList,
        SubjectList
       } from "../../components";

import {
  Container,
  FormGroup,
  Label,
  Input,
  FormText,
  Form,
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
 } from 'reactstrap';

import {
   fetchLevel,
   toggle,
   toggleNested,
   uploadLevel,
   uploadSubject
   } from '../../actions';


function Preview(props){

 const {
        register,
        errors,
        handleSubmit
        } = useForm();


 const {
     register : registerNest,
     errors : errorsNest,
     handleSubmit : handleSubmitNest
  } = useForm();

 const {
        levels,
        fetchLevel,
        nestedModal,
        nestedLoading,
        toggle,
        toggleNested,
        uploadLevel,
        uploadSubject,
        nestedDisabled,
        modal,
        loading,
        disabled,
        subjects
       } = props;

 useEffect(fetchLevel,[]);

 const onLevelSubmit = (data, e) => {
//call the action creator to upload class
   uploadLevel(data, e);
 }


 const onSubmit = (data, e) => {
     console.log(`Data : ${data}`);
     uploadSubject(data, e);
 }

 return (
  <>
     <div className={"d-none d-md-block bg-success"}  style={{
        minHeight : "80px",
      }}>
     </div>


  <Container fluid>
    <div className={"py-3"}>
      <div className={"d-flex justify-content-end"}>
          <Button color={"primary"} onClick={toggle}>Create Exam</Button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
       <Form  key={1} role={"form"} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>Create Exam</ModalHeader>
        <ModalBody>

         <FormGroup>
              <Row>
               <Col>
                 <Input
                     type="select"
                     name="_level"
                     onChange={(e) => console.log(`Clicked ${e.target.value}`)}
                     id="_level"
                     innerRef={register({
                         required : {
                             value : true,
                             message : "Class is required"
                         }
                     })}
                     invalid={errors._level ? true : false}
                 >
                     <option value={""} disabled selected>Select Class</option>
                    {
                     levels.map(level => (
                      <option id={level._id} value={level._id}>{level.name}</option>
                     ))
                    }
                 </Input>
              </Col>
              <Col>
               <Button color="success" onClick={toggleNested}>New Class</Button>
              </Col>
              </Row>
             {errors._level && <FormText color={"danger"}>{errors._level.message}</FormText> }
         </FormGroup>
            <FormGroup>
                <Row>
                    <Col>
                        <label form={"subject"}><strong>Exam</strong></label>
                        <Input
                          type={"text"}
                          name={"title"}
                          innerRef={register({
                              required : {
                                  value : true,
                                  message : "Exam name is required"
                              }
                          })}
                          invalid={errors.title ? true : false}
                          placeholder={"e.g Mathematics"}
                            />
                        {errors.title && <FormText color={"danger"}>{errors.title.message}</FormText>}
                    </Col>
                </Row>
            </FormGroup>
             <FormGroup>
              <Row>
               <Col>
                <Label for={"duration"}><strong> Duration (mins) : </strong></Label>
                <Input
                  type={"number"}
                  name={"duration"}
                  innerRef={register({
                      required : {
                          value : true,
                          message : "Duration is required"
                      }
                  })}
                  invalid={errors.duration ? true : false }
                  placeholder={"e.g 15"}
                 />
                   {errors.duration && <FormText color={"danger"}>{ errors.duration.message}</FormText> }
                </Col>
              </Row>
             </FormGroup>
          <br />
        </ModalBody>

        <ModalFooter>
         <Row>
          <Col>
           <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
          </Col>
          <Col>
             <LoadingButton
               className={"text-center"}
               loading={loading}
               disabled={disabled}
               color={"primary"}
               block={true}
               outline={false}
              >
                Save
             </LoadingButton>
           </Col>
         </Row>

            {/*<Button color="primary" onClick={toggle}>Save</Button>*/}
            {/*<Button color="primary">Save</Button>*/}
        </ModalFooter>
       </Form>
      </Modal>
    </div>



      {/* Top most modal for create level */}
      <Modal isOpen={nestedModal} toggle={toggleNested} >
          <Form key={2} role={"form"} onSubmit={handleSubmitNest(onLevelSubmit)}>
              <ModalHeader>Create Class</ModalHeader>
              <ModalBody>
                  <FormGroup>
                      <Label for={"level"}>Class</Label>
                      <Input
                          type={"text"}
                          name={"name"}
                          innerRef={registerNest({
                              required : {
                                  value : true,
                                  message : "Class is required"
                              }
                          })}
                          placeholder={"e.g SS 3"}
                          invalid={errorsNest.name ? true : false}
                      />
                      {errorsNest.name && <FormText color={"danger"}>{errorsNest.name.message}</FormText>}
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Row>
                      <Col>
                          <Button color="secondary" onClick={toggleNested}>Cancel</Button>{' '}
                      </Col>
                      <Col>
                          <LoadingButton
                              className={"text-center"}
                              loading={nestedLoading}
                              disabled={nestedDisabled}
                              color={"primary"}
                              block={true}
                              outline={false}
                          >
                              Save
                          </LoadingButton>
                      </Col>
                  </Row>
              </ModalFooter>
          </Form>
      </Modal>


{/*
      <Card style={{ minHeight : '60vh'}} className={'d-flex justify-content-center align-items-center'}>
        <div>
            <h4 className={"text-primary"}>Empty</h4>
            <p className={"text-center text-primary"}  style={{fontSize : 30 }}><i className="fa fa-folder-open" aria-hidden="true"></i> </p>
        </div>
      </Card>
*/}

  <RenderList
   isLoading={false}
   list={[1,2,3]}
   component={SubjectList}
  />

  </Container>



      <NotificationContainer />
  </>
 );

}


const mapStateToProps = state => {
   const {
        levels,
        nestedModal,
        nestedLoading,
        nestedDisabled
    } = state.levelStore;

   const {
      modal,
      loading,
      disabled,
      subjects
   } = state.subjectStore;

  return {
          levels,
          nestedModal,
          nestedLoading,
          nestedDisabled,
          modal,
          loading,
          disabled,
          subjects
         };
};


export default connect(
       mapStateToProps,
       {
        fetchLevel,
        toggle,
        toggleNested,
        uploadLevel,
        uploadSubject
       }
       )(Preview);
