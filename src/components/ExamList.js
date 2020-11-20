import React from 'react';
import tw from 'twin.macro';
import styled from "styled-components";

const Container = styled.div`
  ${tw`container mx-auto bg-primary-100 min-h-screen`}
  p{
   ${tw`text-center font-bold text-gray-100 w-full text-white`}
  }
`;

export default () => {
  return (
   <Container>
    <p>Welcome to the Exam Selection Page </p>
   </Container>
  );
}
