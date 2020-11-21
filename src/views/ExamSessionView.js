import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import tw from 'twin.macro';
import styled from 'styled-components';

import {
        fetchQuestions
       } from "../actions";

import { Input, FormGroup } from 'reactstrap';


const Container = styled.div`
    ${tw`pt-6 my-4 md:flex  min-h-screen mx-6`}
`;

const LeftCard = styled.div`
   ${tw`bg-white px-6 md:w-3/4 mx-auto md:mx-0 shadow md:mr-2 rounded-lg`}
`;

const RightCard = styled.div`
    ${tw`md:w-1/4  p-6 mt-2 md:mt-0 mx-auto md:mx-0 bg-white rounded-lg shadow`}
`;

const mapStateToProps = state => {
    let { _subject, questions } = state.questionStore;
    return { _subject, questions };
}

export default connect(mapStateToProps,{ fetchQuestions })((props) => {
    let { _subject, questions, fetchQuestions } = props;
    const [ state, setState ] = useState({
        offset : 0,
        end : 1,
        dataPerPage : 1
    });

    let fetchQuestionCallback = useCallback(() => {
        fetchQuestions(_subject);
    },[_subject]);

    useEffect(fetchQuestionCallback,[]);

    const paginate = (data,dataPerPage) => {
        let totalPages = Math.ceil(data.length / dataPerPage);
        let paginatedPages = [];
        for(let i = 1; i <= totalPages; i++){
            paginatedPages.push(i);
        }
        return paginatedPages;
    };


    const handlePageChange = (e) => {
        let { value } = e.target;
        let end = value + 1;
        alert(`Clicked : ${value}`);
        let offset = state.dataPerPage * value;
        setState(prevState => {
            return {
                ...prevState,
                offset,
                end
            }
        });

    };


    return (
        <>
      <Container>
          <LeftCard>
              <hr className={"mt-6"}/>
              {questions.slice(state.offset, state.end).map((question, index) => {
                  { console.log(`Sel : ${JSON.stringify(question)}`)}
                  return (
                      <>
                      <div key={index} dangerouslySetInnerHTML={{ __html : question.body }}>
                      </div>
                      <FormGroup className={"ml-3"}>
                          <p className={"text-justify"}><Input type={"radio"} name={"answer"} className={"mr-2"} value={question.options.A} /> {question.options.A}</p>
                          <p className={"text-justify"}><Input type={"radio"} name={"answer"} className={"mr-2"} value={question.options.B} /> {question.options.B}</p>
                          <p className={"text-justify"}><Input type={"radio"} name={"answer"} className={"mr-2"} value={question.options.C} /> {question.options.C}</p>
                          <p className={"text-justify"}><Input type={"radio"} name={"answer"} className={"mr-2"} value={question.options.D} /> {question.options.D}</p>
                      </FormGroup>
                      </>
                  )
              })}
              {/* Pagination buttons */}
              <p>{ paginate(questions,state.dataPerPage).map((page, index) => (
                  <button
                      value={index}
                      onClick={handlePageChange}
                      key={index}
                  >
                      {page}
                  </button>
              ))}
              </p>

          </LeftCard>
        <RightCard>
              This is a great idea
        </RightCard>
      </Container>
         </>
    );
})