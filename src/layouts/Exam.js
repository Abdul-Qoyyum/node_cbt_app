import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'reactstrap';

//import Protected from './Protected';

function Exam() {
    return(
        <>
            <Container className={"bg-light h-100"} fluid>
                <Row className={"align-items-center justify-content-center"}>
                    <Col md={"10"}>
                        <Card className={"mt-7 p-4 shadow-lg mb-5 bg-white rounded"}>
                            <h2 className={"text-center"}>CBT APPLICATION</h2>
                         <p>
                             CBT Application to conduct exams, tests and quizzes in schools, jobs screening, conduct surveys and many more.

                             Features of this application are as follows; The application have different levels of users as explained below;

                             Admin is able to create and manage users, user groups, subjects, levels, questions, exams, account types, etc.

                             The User is takes exam from list of available exams.

                             CBT app supports six kinds of questions as follows; Multiple options - Single answer,Multiple options - Multiple answers, Short answers,Long answer, Order Items and Match items

                             CBT app also support three kinds of exam types;
                             Take anytime i.e. exams that can be taken any point in time
                             Take within a time frame i.e. exam that can only be taken within a period of time
                             Take real time i.e. exams that can the taken on a scheduled time only

                             Exams are taken within a time frame and once the time exceeds, exam is submitted and a result generated showing different information about the exam like; time spent in exam, no of questions answered and unanswered, questions passed and failed, exam score, questions review etc.
                         </p>
                         <hr />
                         <div className={"d-flex flex-row-reverse bd-highlight"}>
                             <button type="button" className="btn btn-success">Courses</button>
                         </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

//export default Protected(Exam);
export default Exam;
