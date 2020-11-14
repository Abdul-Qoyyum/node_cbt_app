import React, { Component } from 'react';
import _ from "lodash";
import PropTypes from 'prop-types';
import StyledContentLoader from 'styled-content-loader';

import Empty from "./Empty";

//HOC to render the list
//or empty page
export class RenderList extends Component{

 render(){
  const { isLoading, lists, component : Component } = this.props;
  return (
    <StyledContentLoader isLoading={isLoading}>
    { _.isEmpty(lists) ? <Empty /> : <Component lists={lists} /> }
    </StyledContentLoader>
  );
 }

}

RenderList.propTypes = {
 isLoading : PropTypes.bool,
 list : PropTypes.array,
 component : PropTypes.element
};
