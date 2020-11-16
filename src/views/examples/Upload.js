import React, { useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
        RenderList
       } from "../../components";

import SubjectList from "../../components";

import {
    fetchSubjects
} from "../../actions";

function Upload(props){
    const { subjects, isLoading, fetchSubjects } = props;

    const subjectsCallback = useCallback(fetchSubjects,[]);

    useEffect(() => {
        subjectsCallback();
    },[ subjectsCallback ]);

    return(
        <>
            <div className={"d-none d-md-block bg-success"}  style={{ minHeight : "80px" }}>
            </div>
            <Container className={"pt-6"}>
                <RenderList
                    isLoading={isLoading}
                    lists={subjects}
                    component={SubjectList}
                    path={"/admin/upload/ques"}
                />
            </Container>
        </>
        )

}





const mapStateToProps = state => {
   const  { subjects, isLoading } = state.subjectStore;
    return {
       subjects,
       isLoading
    };
}

export default connect(
          mapStateToProps,
         {fetchSubjects})(Upload)
