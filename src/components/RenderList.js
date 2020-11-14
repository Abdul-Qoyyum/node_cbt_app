import React, { Component } from 'react';
import _ from "lodash";
import PropTypes from 'prop-types';

import Empty from "./Empty";

//HOC to render the list
//or empty page
export class RenderList extends Component{

 render(){
  const { isLoading, list, component : Component } = this.props;
  return (
   <>
    { _.isEmpty(list) ? <Empty /> : <Component {...list} /> }
   </>
  );
 }

}

RenderList.propTypes = {
 isLoading : PropTypes.bool,
 list : PropTypes.array,
 component : PropTypes.element
};
