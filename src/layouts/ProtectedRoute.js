import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from "./Auth";

function Protected({
    component : Component,
    ...rest}){

    return (
        <Route
            {...rest}
            render={props => (
                localStorage.getItem("emstoken") ? <Component {...rest} {...props}/> : <AuthLayout {...rest} {...props} />
            )}
        />
    );


}

export default Protected;


