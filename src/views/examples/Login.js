/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
//import axios from 'axios';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//react hook form
import { useForm } from "react-hook-form";

import LoadingButton from "../../components/LoadingButton";

//actions
import {
        loginUser,
        clearError
       } from "../../actions";

// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  FormText,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";


function Login(props){
    const {handleSubmit,register,errors} = useForm();
    const {
      loading,
      redirect,
      loginUser,
      clearError,
      disabled,
      error
       } = props;
/*
    if(redirect){
      return <Redirect to={"/admin"} />
    }
*/
      return (
          <>
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">

                  <div className="text-center text-muted mb-4">
                    <small>Sign in with credentials</small>
                  </div>

                  <Form role="form" onSubmit={handleSubmit(loginUser)}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" name="email" type="email"
                               innerRef={register({
                                 required: {
                                   value: true,
                                   message: "Email is required"
                                 },
                                 pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Invalid email address"
                                 }
                               })}
                               invalid={errors.email || error.email ? true : false}
                               autoComplete="new-email"
                               onChange={clearError}
                        />
                      </InputGroup>
                        {errors.email && (<FormText color={"danger"}>{errors.email.message}</FormText>)}
                        { error.email.message && (<FormText color={"danger"}>{error.email.message}</FormText>) }
                    </FormGroup>
                    <FormGroup invalid>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" name="password" type="password"
                               innerRef={register({
                                 required: {
                                   value: true,
                                   message: "Password is required"
                                 }
                               })}
                               invalid={errors.password ? true : false}
                               autoComplete="new-password"
                        />
                      </InputGroup>
                       {errors.password &&  (<FormText color={"danger"}>{errors.password.message}</FormText>)}
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <Input
                          className="custom-control-input"
                          id="remember_me"
                          name={"remember_me"}
                          type="checkbox"
                          innerRef={register}
                      />
                      <label
                          className="custom-control-label"
                          htmlFor="remember_me"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <LoadingButton
                          className="mt-4"
                          loading={loading}
                          disabled={disabled}
                          color={"primary"}
                          block={true}
                          outline={false}
                      >
                        Sign in
                      </LoadingButton>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>

          </>
      );

}


const mapStateToProps = state => {
  let { loading, redirect, error, disabled } = state.authStore;
   return {
     loading,
     redirect,
     error,
     disabled
   }
}

export default connect(mapStateToProps,{
  loginUser,
  clearError
})(Login);
