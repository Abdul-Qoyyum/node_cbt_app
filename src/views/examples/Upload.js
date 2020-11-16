import React from "react";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
        SubjectList,
        RenderList
       } from "../../components";


function Upload(props){
  const { subjects, isLoading } = props;

  return(
     <>
       <div className={"d-none d-md-block bg-success"}  style={{
         minHeight : "80px"
        }}>
      </div>
       <Container>
         <RenderList
          isLoading={false}
          lists={subjects}
          component={SubjectList}
          path={"/admin/upload"}
         />
       </Container>
     <>
  )

}

const mapStateToProps = state => {

   let  {
          subjects,
          isLoading
         } = state.subjectStore;

    return {
       subjects,
       isLoading
    };

}

export default connect(
          mapStateToProps,
          null)(Upload);
