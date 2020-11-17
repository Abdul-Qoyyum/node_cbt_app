import React, {
       useEffect,
       useCallback,
       useState
       } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { size } from 'lodash';

import {
   Card,
   Row,
   Container,
   Col,
   CardText,
   Button
  } from 'reactstrap';

import {
    showQuestionOrPreview
} from "../actions";


function SubjectList({lists, path, showQuestionOrPreview }){
 const history = useHistory();

 const [ state, setState ] = useState({
  perPage : 9,
  offset : 0,
  paginatedList : [],
  pageCount : null
   });


 const calPageCount = () => {
   let { offset, perPage } = state;
   let pageCount = size(lists) / perPage;
   const paginatedList = lists.slice( offset, state.perPage);
    setState({
      ...state,
      pageCount,
      paginatedList
    });
  }



 const calPageCountCallback = useCallback(calPageCount,[ lists ]);



 useEffect(() => {
  calPageCountCallback();
 },[ calPageCountCallback ]);



 const handlePageClick = (data) => {
  let { perPage } = state;
  let selected = data.selected;
  let offset = Math.ceil(selected * perPage);
  let end = offset + perPage;
  let paginatedList = lists.slice(offset, end);
   setState({
    ...state, paginatedList
   });
 }

 return (
   <Container style={{minHeight : '80vh'}}>

         <Row>
             {
                 state.paginatedList.map(function(list, index){
                     return (
                       <Col key={index} xs={12} sm={6} md={4} className={'mb-3'}>
                          <Card body>
                                <CardText>
                                    <p><strong>Subject Name : </strong> {list.title}</p>
                                    <p><strong>Class : </strong> {list._level.name}</p>
                                    <p><strong>Duration : </strong> {list.duration} (mins)</p>
                                </CardText>
                              <Button className={'bg-primary text-white'}  onClick={() => showQuestionOrPreview(list._id, path, history)}>Select</Button>
                          </Card>
                       </Col>
                     )
                 })
             }
        </Row>
    <div className={"d-flex justify-content-center"}>
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
    </div>

   </Container>
 )
}

export default connect(null,{ showQuestionOrPreview })(SubjectList);
