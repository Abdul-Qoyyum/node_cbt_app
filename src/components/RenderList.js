import React, { Component } from 'react';
import _ from "lodash";
import PropTypes from 'prop-types';
import StyledContentLoader from 'styled-content-loader';

import Empty from "./Empty";

//HOC to render the list
//or empty page
export class RenderList extends Component{

 render(){
  const { isLoading, list, component : Component } = this.props;
  return (
    <StyledContentLoader isLoading={isLoading}>
    { _.isEmpty(list) ? <Empty /> : <Component {...list} /> }
    </StyledContentLoader>
  );
 }

}

RenderList.propTypes = {
 isLoading : PropTypes.bool,
 list : PropTypes.array,
 component : PropTypes.element
};
