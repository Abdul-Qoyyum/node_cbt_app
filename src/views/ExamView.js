import React from 'react';
import ExamList from '../components/ExamList';
import Header from "../components/Headers/light";
import tw from 'twin.macro';

const Container = tw.div`pt-6 px-6`;

export default () => {
  return(
   <Container>
    <Header roundedHeaderButton={true} />
    <ExamList />
   </Container>
  );
}
