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
import React, {useState} from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

//react hook form
import { useForm } from "react-hook-form";
import LoadingButton from "../../components/LoadingButton";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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

function Login(){
    const {handleSubmit,register,setError,errors} = useForm();
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const onSubmit = data => {
      setLoading(true);
      axios.post('/api/login',data).then(res => {
        console.log(res);
        //grab user here for redux...
          //localStorage.setItem('D-user',res.data);
         //localStorage.setItem('D-token', data.remember_me ? `${res.headers.token}` : '');
         setLoading(false);
         setRedirect(true);
      }).catch(err => {
         setLoading(false);
         setError("email",{
           type : "manual",
           message : "Invalid Credentials."
         });
      });
    };

    if(redirect){
      return <Redirect to={"/exam"} />
    }
      return (
          <>
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form" onSubmit={handleSubmit(onSubmit)}>
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
                               autoComplete="new-email"
                               invalid={errors.email ?? true}
                        />
                      </InputGroup>
                        <FormText color={"danger"}>{errors.email && errors.email.message}</FormText>
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
                                 },
                                 minLength: {
                                   value: 6,
                                   message: "Minimum of six (6) characters is required"
                                 }
                               })}
                               autoComplete="new-password"
                               invalid={errors.password ?? true}
                        />
                      </InputGroup>
                        <FormText color={"danger"}> {errors.password && errors.password.message}</FormText>
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
                          loading={false || loading}
                          disabled={false}
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

export default Login;
