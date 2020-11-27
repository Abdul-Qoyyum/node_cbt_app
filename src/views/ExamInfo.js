import React from 'react';
import { connect } from 'react-redux';
import tw from 'twin.macro';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Headers/light';
import LoadingButton from "../components/LoadingButton";
import { startExamSession } from "../actions";

const Container = styled.div`
     ${tw`md:flex shadow-lg bg-white mx-6 md:mx-auto my-8 max-w-lg md:max-w-2xl`}
`;

const Img = styled.img`
    ${tw`h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none`}
`;


const Card = styled.div`
    ${tw`w-full md:w-2/3 px-4 py-4 bg-white rounded-lg`}
`;


const CardHeader = styled.div`
     ${tw`flex items-center`}
     h2 {
        ${tw`text-xl text-gray-800 font-medium mr-auto`}
     }
     p{
       ${tw`text-gray-800 font-semibold tracking-tighter`}
     }
     i{
       ${tw`text-gray-600 line-through`}
     }
`;

const CardText = styled.p`
      ${tw`text-sm text-gray-700 mt-4`}
`;

const CardFooter = styled.div`
    ${tw`flex items-center justify-end mt-4 top-auto`}
`;


const CancelButton = styled.button`
    ${tw`bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline`}
`;

const Main = styled.div`
    ${tw`pt-6 px-6`}
`;

function ExamInfo({ _subject, startExamSession, loading, disabled }){
    const history = useHistory();
    return(
        <>
            <Main>
              <Header roundedHeaderButton={true} />
            </Main>
            <Container>
                <Img src={"https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg"} />
                    <Card>
                        <CardHeader>
                            <h2>Notice</h2>
                        </CardHeader>
                        <CardText>
                            You are about to start <strong>{ _subject.title }</strong> Exam for <strong>{ _subject._level.name }</strong>. You have <strong>{ _subject.duration } min(s)</strong> to answer all question(s).
                            <br />Your Exam will be automatically submitted after your time has elapsed if you do not submit before your time runs out. <br />
                            <strong> You are expected to :</strong> <br/> i) Use the mouse to select the appropriate answer for a question. <br />
                            <br /> ii) Use the number below the screen to navigate among question(s)<br/>
                            <strong>You are not expected to : </strong><br/><p> i) Refresh the page during the process of the Exam </p> <p>ii) Close the broswer when the examination session is on </p>
                            <strong>Failure to comply will result in automatic zero as your Exam Score.</strong><br/> We wish you the best of luck in your Exam.
                        </CardText>
                        <CardFooter>
                            <CancelButton>Back</CancelButton>
                            <div className={"w-40"}>
                            <LoadingButton
                                loading={loading}
                                disabled={disabled}
                                color={"primary"}
                                block={true}
                                className={"w-100"}
                                outline={false}
                                onClick={() => startExamSession(_subject._id, history)}
                            >
                                <span className={'mx-3'}>{loading ? "Processing" : "Proceed"}</span>
                            </LoadingButton>
                            </div>
                        </CardFooter>
                    </Card>
            </Container>
        </>
        );
}


const mapStateToProps = state => {
    let { _subject, loading, disabled } = state.questionStore;
    return { _subject, loading, disabled };
}

export default connect(mapStateToProps,{ startExamSession })(ExamInfo);