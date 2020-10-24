import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ExamLayout from "./layouts/Exam";
import ProtectedRoute from "./layouts/Protected";

import './App.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth : true
        }
    }

    componentDidMount() {
        this.setState({
            auth : true
        })
    }

    render() {
        return (
                <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <ProtectedRoute
                        path={"/exam"}
                        component={ExamLayout}
                        isAuthenticated={this.state.auth}
                    />

                    <Redirect from="/" to="/auth/login" />
                    {/*      <Redirect from="/" to="/admin/index" /> */}
                </Switch>
        )
    }
}

export default App;
