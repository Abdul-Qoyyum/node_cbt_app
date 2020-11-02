import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from "./Auth";

function Protected({
    component : Component,
    isAuthenticated,
    ...rest}){

    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ? <Component {...rest}/> : <AuthLayout {...rest}/>
            )}
        />
    );
}

export default Protected;


