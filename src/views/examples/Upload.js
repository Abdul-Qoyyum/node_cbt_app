import React, { useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
        SubjectList,
        RenderList
       } from "../../components";

import {
    fetchSubjects
} from "../../actions";

function Upload(props){
    const { subjects, isLoading } = props;

    const subjectsCallback = useCallback(fetchSubjects,[]);

    useEffect(() => {
        subjectsCallback();
    },[ subjectsCallback ]);

    return(
        <>
            <div className={"d-none d-md-block bg-success"}  style={{ minHeight : "80px" }}>
            </div>
            <Container>
                <RenderList
                    isLoading={isLoading}
                    lists={subjects}
                    component={SubjectList}
                    path={"/admin/upload"}
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
          null)(Upload)
