import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';

import LoadingButton from "../../components/LoadingButton";

import {
  Container,
  FormGroup,
  Label,
  Input,
  FormText,
  Form,
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
   uploadLevel
   } from '../../actions';


function Preview(props){
 const {
        register,
        errors,
        handleSubmit
        } = useForm();

 const {
        levels,
        fetchLevel,
        modal,
        nestedModal,
        loading,
        nestedLoading,
        toggle,
        toggleNested,
        uploadLevel,
        nestedDisabled
       } = props;

 useEffect(fetchLevel,[]);

 const onLevelSubmit = (data, e) => {
//call the action creator to upload class
   uploadLevel(data, e);
 }

 return (
  <>
     <div className={"d-none d-md-block bg-success"}  style={{
        minHeight : "80px",
      }}>
     </div>


  <Container fluid>
    <div className={"pt-3"}>
      <Button color={"primary"} onClick={toggle}>Create Exam</Button>

      <Modal isOpen={modal} toggle={toggle}>
       <Form>
        <ModalHeader toggle={toggle}>Create Exam</ModalHeader>
        <ModalBody>

         <FormGroup>
              <Row>
               <Col>
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
                     <option value={""} disabled selected onClick={e => alert(` Selected : ${e.target.value}`)}>Select Class</option>
                    {
                     levels.map(level => (
                      <option id={level._id} >{level.name}</option>
                     ))
                    }
                 </Input>
              </Col>
              <Col>
               <Button color="success" onClick={toggleNested}>Create Class</Button>
              </Col>
              </Row>
             </FormGroup>
                 {errors.level && <FormText color={"danger"}>{errors.level.message}</FormText> }
             <FormGroup>
              <Row>
               <Col>
                <Label for={"duration"}><strong> Duration (mins) : </strong></Label>
                <Input
                  type={"number"}
                  name={"duration"}
                  placeholder={"e.g 15"}
                 />
                </Col>
              </Row>
             </FormGroup>


          <br />
          <Modal isOpen={nestedModal} toggle={toggleNested} >
           <Form role={"form"} onSubmit={handleSubmit(onLevelSubmit)}>
            <ModalHeader>Create Class</ModalHeader>
             <ModalBody>
               <FormGroup>
                 <Label for={"level"}>Class</Label>
                 <Input
                   type={"text"}
                   name={"level"}
                   innerRef={register({
                     required : {
                       value : true,
                       message : "Class is required"
                     }
                   })}
                   placeholder={"e.g SS 3"}
                   invalid={errors.level ? true : false}
                 />
                {errors.level && <FormText color={"danger"}>{errors.level.message}</FormText>}
               </FormGroup>
             </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleNested}>Cancel</Button>{' '}
{/*              <Button color="primary" >Save</Button> */}
                      <LoadingButton
                          loading={nestedLoading}
                          disabled={nestedDisabled}
                          color={"primary"}
                          block={true}
                          outline={false}
                      >
                        Save
                      </LoadingButton>

            </ModalFooter>
           </Form>
          </Modal>

        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={toggle}>Save</Button>
        </ModalFooter>

       </Form>
      </Modal>
    </div>
  </Container>
   <NotificationContainer />
 </>
 );

}


const mapStateToProps = state => {
  const {
         levels,
         modal,
         nestedModal,
         loading,
         nestedLoading,
         nestedDisabled
        } = state.levelStore;

  return {
          levels,
          modal,
          nestedModal,
          loading,
          nestedLoading,
          nestedDisabled
         };
};


export default connect(
       mapStateToProps,
       {
        fetchLevel,
        toggle,
        toggleNested,
        uploadLevel
       }
       )(Preview);
