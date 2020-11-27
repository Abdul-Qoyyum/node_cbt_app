import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import tw from 'twin.macro';
import styled from 'styled-components';
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import {
    fetchQuestions,
    selectAnswer,
    calculateScoreAndSubmitExam
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
    ${tw`flex flex-col items-center justify-start bg-white mt-2 md:mt-0 p-4 shadow md:w-1/4 rounded-lg`}
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

const PrimaryButton = styled(PrimaryButtonBase)(props => [
    tw`mt-3 mb-0 text-sm inline-block mx-auto md:mx-0`,
    props.buttonRounded && tw`rounded-full`
]);

const ButtonContainer = tw.div`flex w-full justify-end`;

const mapStateToProps = state => {
    let { _subject, questions, mask } = state.questionStore;
    return { _subject, questions, mask };
};

class ExamSessionView extends Component{
    constructor(props){
        super(props);
        this.state = {
            offset : 0,
            end : 1,
            dataPerPage : 1,
            duration : "0.00"
        };
        this.paginate = this.paginate.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.timeoutOrSubmit = this.timeoutOrSubmit.bind(this);
    }

    componentDidMount(){
        const { _subject, fetchQuestions } = this.props;
        //fetch all questions
        fetchQuestions(_subject._id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { _subject, questions, calculateScoreAndSubmitExam } = this.props;
        //compare the previous props with the new props
        if(!_.isEqual(prevProps.questions, questions)){
            //handle exam duration here;
            const end = Date.now() + (parseInt(_subject.duration) * 60 * 1000);
            const interval = setInterval(() => {
                let total = end - Date.now();
                let secs = Math.floor((total/1000) % 60);
                let mins = Math.floor((total/1000/60) % 60);
                let formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
                if(total <= 0){
                    //handle submission if time have elapsed
                    return this.timeoutOrSubmit(interval, calculateScoreAndSubmitExam);
                }else{
                    //update time for rendering
                    this.setState({
                        ...this.state, duration : `${mins} : ${formattedSecs}`
                    });
                }
            },1000);
        }
    }

    timeoutOrSubmit(interval, callback){
        let { history, _subject, questions } = this.props;
        callback(_subject, questions, history);
        return clearInterval(interval);
    }

    paginate(data,dataPerPage){
        let totalPages = Math.ceil(data.length / dataPerPage);
        let paginatedPages = [];
        for(let i = 1; i <= totalPages; i++){
            paginatedPages.push(i);
        }
        return paginatedPages;
    };


    handlePageChange(e, page){
//     prevent default link reaction
        e.preventDefault();
        let value = e.target.id;
        let end = page;
        let offset = this.state.dataPerPage * value;
        this.setState({
            ...this.state, offset, end
        });
    };

    render(){
        const { questions, selectAnswer, mask } = this.props;
     return (
        <LoadingMask loading={mask} loadingText={"Submitting..."}>
            <Container>
                <LeftCard>
                    <hr className={"mt-3"}/>
                    <Form id={"questions"}>
                        {questions.slice(this.state.offset, this.state.end).map((question, index) => {
                            return (
                                <div key={question._id}>
                                    <div className={"d-md-flex justify-content-between"}>
                                        <strong className={"mb-2 d-block"}>Question {this.state.end}</strong>
                                        <div><strong>Time left : <span>{this.state.duration}</span></strong></div>
                                    </div>
                                    <hr/>
                                    <div style={{fontSize: '60'}} dangerouslySetInnerHTML={{__html: question.body}}>
                                    </div>
                                    <FormGroup className={"ml-3"}>
                                        <p className={"text-justify"}><Input
                                            type={"radio"}
                                            name={this.state.end - 1}
                                            onChange={selectAnswer}
                                            defaultChecked={question.options.A === question.selectedAnswer}
                                            value={question.options.A}/> {question.options.A}</p>
                                        <p className={"text-justify"}><Input type={"radio"}
                                                                             name={this.state.end - 1}
                                                                             onChange={selectAnswer}
                                                                             defaultChecked={question.options.B === question.selectedAnswer}
                                                                             value={question.options.B}/> {question.options.B}
                                        </p>
                                        <p className={"text-justify"}><Input type={"radio"}
                                                                             name={this.state.end - 1}
                                                                             onChange={selectAnswer}
                                                                             defaultChecked={question.options.C === question.selectedAnswer}
                                                                             value={question.options.C}/> {question.options.C}
                                        </p>
                                        <p className={"text-justify"}><Input type={"radio"}
                                                                             name={this.state.end - 1}
                                                                             defaultChecked={question.options.D === question.selectedAnswer}
                                                                             onChange={selectAnswer}
                                                                             value={question.options.D}/> {question.options.D}
                                        </p>
                                    </FormGroup>
                                </div>
                            )
                        })}
                    </Form>
                    {/* Pagination buttons */}
                    <Pagination style={{flexWrap: 'wrap'}} aria-label="Page navigation example">
                        {this.paginate(this.props.questions, this.state.dataPerPage).map((page, index) => (
                            <PaginationItem
                                key={index}
                                active={!!this.props.questions[index].selectedAnswer}
                                className={'mb-2'}
                            >
                                <PaginationLink
                                    href={"#"}
                                    id={index}
                                    onClick={e => this.handlePageChange(e, page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </Pagination>
                    <ButtonContainer>
                        <PrimaryButton buttonRounded={true} form={"questions"}>
                            Submit
                        </PrimaryButton>
                    </ButtonContainer>
                </LeftCard>

                <RightCard>
                    <div className="">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=128&h=128&q=60&facepad=2"
                            alt=""
                        />
                    </div>

                    <h2>Sebastian Bennett</h2>
                    <h6>Exam : {this.props._subject.title}</h6>
                    <h6>Class : {this.props._subject._level.name}</h6>
                    <h6>Duration : {this.props._subject.duration} min(s)</h6>
                    <p>
                        You have {this.state.duration} left
                    </p>
                </RightCard>
            </Container>
        </LoadingMask>
    )}
}

export default compose(
    withRouter,
    connect(mapStateToProps,{
    fetchQuestions,
    selectAnswer,
    calculateScoreAndSubmitExam }))(ExamSessionView);
