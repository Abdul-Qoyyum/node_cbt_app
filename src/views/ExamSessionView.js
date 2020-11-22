import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import tw from 'twin.macro';
import styled from 'styled-components';

import {
        fetchQuestions,
        selectAnswer
       } from "../actions";

import {
        Input,
        FormGroup,
        Form,
        Pagination,
        PaginationItem,
        PaginationLink
        } from 'reactstrap';

const Container = styled.div`
    ${tw`pt-6 my-4 md:flex  min-h-screen mx-6`}
`;

const LeftCard = styled.div`
   ${tw`bg-white px-6 md:w-3/4 mx-auto md:mx-0 shadow md:mr-2 text-xl rounded-lg`}
`;

const RightCard = styled.div`
    ${tw`flex flex-col items-center justify-center bg-white p-4 shadow md:w-1/4 rounded-lg`}
    div {
      ${tw`inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40`}
    }
    img {
      ${tw`h-full w-full`}
    }
    h2{
      ${tw`mt-4 font-bold text-xl`}
    }
    h6{
      ${tw`mt-2 text-sm font-medium`}
    }
    p{
      ${tw`text-xs text-gray-500 text-center mt-3`}
    }
`;

const mapStateToProps = state => {
    let { _subject, questions } = state.questionStore;
    return { _subject, questions };
};

export default connect(mapStateToProps,{ fetchQuestions, selectAnswer })((props) => {
    let { _subject, questions, selectAnswer,fetchQuestions } = props;
    const [ state, setState ] = useState({
        offset : 0,
        end : 1,
        dataPerPage : 1
    });
    const [duration, setDuration ] = useState("0.00");

    let fetchQuestionCallback = useCallback(() => {
        fetchQuestions(_subject);
    },[_subject]);

    useEffect(() => {
        fetchQuestionCallback();
        //handle exam duration here
        let end = Date.now() + (2 * 60 * 1000);
        let interval = setInterval(function(){
            let total = end - Date.now();
            let secs = Math.floor((total/1000) % 60);
            let mins = Math.floor((total/1000/60) % 60);
            let formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
            if(total <= 0){
                //handle submission if time have elapsed
                return clearInterval(interval);
            }

             setDuration(`${mins} mins : ${formattedSecs} secs`);

        },1000);

    },[]);

    const paginate = (data,dataPerPage) => {
        let totalPages = Math.ceil(data.length / dataPerPage);
        let paginatedPages = [];
        for(let i = 1; i <= totalPages; i++){
            paginatedPages.push(i);
        }
        return paginatedPages;
    };


    const handlePageChange = (e, page) => {
//     prevent default link reaction
        e.preventDefault();
        let value = e.target.id;
        let end = page;
        let offset = state.dataPerPage * value;
        setState({
          ...state, offset, end
         });

    };

    return (
        <>
      <Container>
          <LeftCard>
              <hr className={"mt-3"}/>
           <Form>
              {questions.slice(state.offset, state.end).map((question, index) => {
                  return (
                     <div key={question._id}>
                         <div className={"d-md-flex justify-content-between"}>
                             <strong className={"mb-2 d-block"}>Question { state.end }</strong> <div><strong>Time left : <span>{duration}</span></strong></div>
                         </div>
                         <hr/>
                      <div style={{ fontSize : '60'}} dangerouslySetInnerHTML={{ __html : question.body }}>
                      </div>
                      <FormGroup className={"ml-3"}>
                          <p className={"text-justify"}><Input
                                            type={"radio"}
                                            name={state.end - 1}
                                            onChange={selectAnswer}
                                            defaultChecked={question.options.A === question.selectedAnswer }
                                            value={question.options.A} /> {question.options.A}</p>
                          <p className={"text-justify"}><Input type={"radio"}
                                                               name={state.end - 1}
                                                               onChange={selectAnswer}
                                                               defaultChecked={question.options.B === question.selectedAnswer }
                                                               value={question.options.B} /> {question.options.B}</p>
                          <p className={"text-justify"}><Input type={"radio"}
                                                               name={state.end - 1}
                                                               onChange={selectAnswer}
                                                               defaultChecked={question.options.C === question.selectedAnswer }
                                                               value={question.options.C} /> {question.options.C}</p>
                          <p className={"text-justify"}><Input type={"radio"}
                                                               name={state.end - 1}
                                                               defaultChecked={question.options.D === question.selectedAnswer }
                                                               onChange={selectAnswer}
                                                               value={question.options.D} /> {question.options.D}</p>
                      </FormGroup>
                     </div>
                  )
              })}
            </Form>
              {/* Pagination buttons */}
            <Pagination style={{ flexWrap : 'wrap' }} aria-label="Page navigation example">
              { paginate(questions,state.dataPerPage).map((page, index) => (
               <PaginationItem
                 key={index}
                 active={!!questions[index].selectedAnswer}
                 className={'mb-2'}
                >
                 <PaginationLink
                   href={"#"}
                   id={index}
                   onClick={e => handlePageChange(e, page)}
                 >
                     { page }
                 </PaginationLink>
               </PaginationItem>
              ))}
            </Pagination>
          </LeftCard>

            <RightCard>
                <div className="">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=128&h=128&q=60&facepad=2"
                        alt=""
                    />
                </div>

                <h2>Sebastian Bennett</h2>
                <h6>Founder</h6>

                <p>
                    You have {duration} left
                </p>

                {/*<ul className="flex flex-row mt-4 space-x-2">*/}
                {/*    <li>*/}
                {/*        <a href=""*/}
                {/*           className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">*/}
                {/*            <i className="fab fa-facebook"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href=""*/}
                {/*           className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">*/}
                {/*            <i className="fab fa-twitter"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href=""*/}
                {/*           className="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">*/}
                {/*            <i className="fab fa-instagram"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </RightCard>
      </Container>
         </>
    );
})
