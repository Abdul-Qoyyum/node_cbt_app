import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

const Container = styled.div`
  ${tw`relative bg-white overflow-hidden`}
`;
const Overlay = styled.div`
   ${tw`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden`}
`;

const Main = styled.div`
   ${tw`mt-10 mx-auto max-w-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20`}
`;

const Hero = styled.div`
   ${tw`sm:text-center lg:text-left`}
`;

const ImageContainer = styled.div`
    ${tw`lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2`}
`;


function ExamInfo(){
    return(
        <>
<Container>
<div className="max-w-7xl mx-auto">
<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

    <Overlay>

        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
<div className="px-5 pt-4 flex items-center justify-between">
<div>
<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt=""/>
</div>
<div className="-mr-2">
<button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
<span className="sr-only">Close main menu</span>
<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
</div>
</div>

</div>
</Overlay>

<Main>
<Hero>
<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
<span className="block xl:inline">Data to enrich your</span>
<span className="block text-indigo-600 xl:inline">online business</span>
</h1>
<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
</p>
<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
<div className="rounded-md shadow">
<a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
Get started
</a>
</div>
<div className="mt-3 sm:mt-0 sm:ml-3">
<a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
Live demo
</a>
</div>
</div>
</Hero>
  </Main>
  </div>
</div>
  <ImageContainer>
   <img className="EyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" />
  </ImageContainer>
</Container>
       </>
  );
}


export default ExamInfo;