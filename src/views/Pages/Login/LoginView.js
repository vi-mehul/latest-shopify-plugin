import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";


  const LoginView = () => {
    // let history = useHistory();
  const [logindata, setlogindata] = useState({
    isLoginUserName : "",
    isLoginPassword : "",
  })
  
  const oninputChange = (e) => {
      
    setlogindata({...logindata,[e.target.name]:e.target.value})
    
}
  const OnSubmitLoginDetail=()=> {
   
    console.log("dfewafwe",logindata);
  }
  
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1 style={{textAlign:"center"}}>Login</h1>
                      <p className="text-muted" style={{textAlign:"center"}}>Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          name="isLoginUserName"
                          Value={logindata.isLoginUserName}
                          onChange={(e) => oninputChange(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="isLoginPassword"
                          value={logindata.isLoginPassword}
                          onChange={(e) => oninputChange(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4 login_btn" onClick = {() =>OnSubmitLoginDetail()}>
                            Login
                          </Button>
                          {/* <Button color="primary" className="px-4 m-2 login_btn" onClick={() => history.goBack()}>
                            Back
                          </Button> */}
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0 fp_text">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          
                        </Col>
                        
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}

export default LoginView;
