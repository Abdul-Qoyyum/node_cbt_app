import React, {useState, useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import styled from "styled-components";
import { connect } from 'react-redux';
import { size } from 'lodash';
import ReactPaginate from 'react-paginate';
import {PrimaryButton as PrimaryButtonBase} from "./misc/Buttons";
import {
         fetchAllSubjects,
         showQuestionOrPreview
        } from "../actions";

const Container = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-8  xl:grid-cols-4 gap-6 px-6`}
`;

const Card = styled.div`
   ${tw`flex flex-col items-start bg-white p-6 shadow rounded-lg`}
`;
const H2 = styled.h2`
  ${tw`mt-4 font-bold text-xl`} 
`
const H6 = styled.h6`
  ${tw`text-sm font-medium`}
`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
    tw`mt-3 mb-0 text-sm inline-block mx-auto md:mx-0`,
    props.buttonRounded && tw`rounded-full`
]);

const ButtonContainer = tw.div`flex w-full justify-center`;

const PaginationContainer = tw.div`flex mt-6 justify-center`;

const mapStateToprops = state => {
  let { subjects } = state.subjectStore;
  return { subjects };
};

export default connect(mapStateToprops,{ fetchAllSubjects, showQuestionOrPreview })((props) => {
    let [ state, setState ] = useState({
        offset : 0,
        perPage : 8,
        end : 8,
        pageCount : null
    });
    let history = useHistory();
    let { fetchAllSubjects, subjects, showQuestionOrPreview } = props;
    const fetchSubjectsCallback = useCallback(fetchAllSubjects,[]);
    useEffect(() => {
       fetchSubjectsCallback();
    },[fetchSubjectsCallback]);

    const calPageCount = () => {
        let { perPage } = state;
        let pageCount = size(subjects) / perPage;
        setState({
            ...state,
            pageCount
        });
    };

    const calPageCountCallback = useCallback(calPageCount,[ subjects ]);


    useEffect(() => {
        calPageCountCallback();
    },[ calPageCountCallback ]);


    const handlePageClick = (data) => {
        let { perPage } = state;
        let selected = data.selected;
        let offset = Math.ceil(selected * perPage);
        let end = offset + perPage;
        setState({
            ...state, offset, end
        });
    }

  return (
      <>
      <Container>
          {
              subjects.slice(state.offset, state.end).map((subject, index) => {
                return (
                    <Card key={index}>
                        <H2>Exam : { subject.title }</H2>
                        <H6>Class : { subject._level.name }</H6>
                        <H6>Duration : { subject.duration } min(s)</H6>
                        <H6>Examiner : Miss Mosun </H6>
                        <ButtonContainer>
                            <PrimaryButton onClick={() => showQuestionOrPreview(subject._id, '/exam/session', history)} buttonRounded={true}>
                                Start
                            </PrimaryButton>
                        </ButtonContainer>
                    </Card>
                )
              })
          }
      </Container>
      <PaginationContainer>
          <ReactPaginate
              previousLabel={' << '}
              nextLabel={' >> '}
              breakLabel={'...'}
              pageCount={state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              activeClassName={'active'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
          />
      </PaginationContainer>
      </>
  );
})
