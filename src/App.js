import React ,{ Component } from 'react';
import {
        Route,
        Switch,
        Redirect } from 'react-router-dom';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ExamLayout from "./layouts/Exam";
import ProtectedRoute from "./layouts/ProtectedRoute";


import './App.css';
import 'react-notifications/lib/notifications.css';

 class App extends Component {

    render(){
        return (
                <Switch>
                     <ProtectedRoute
                       path="/admin"
                       component={AdminLayout}
                      />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <ProtectedRoute
                        path={"/exam"}
                        component={ExamLayout}
                    />
                    <Redirect from="*" to="/auth/login" />
                </Switch>
        );
      }
}

export default App;

