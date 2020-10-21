import React, {useState} from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


  const Register = () => {

    const [user, setUser] = useState({ 
      username:"",
      email:"",
      password:"",
      reppassword:""
  });

    const oninputChange = e => {
      
      setUser({...user,[e.target.name]:e.target.value})
      
  }

    const onSubmit = async e => {
      e.preventDefault();
      console.log("user", user)
  }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={e => onSubmit(e)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input type="text"
                      placeholder="Username"
                      name="username"
                      value={user.username} 
                      onChange = {e => oninputChange(e)} 
                      autoComplete="username" />

                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>

                      <Input type="text" 
                      placeholder="Email"
                      name="email"
                      value={user.email} 
                      onChange = {e => oninputChange(e)} 
                      autoComplete="email" />

                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">

                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input type="password" 
                      placeholder="Password"
                      name="password"
                      value={user.password} 
                      onChange = {e => oninputChange(e)} 
                      autoComplete="new-password" />

                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input type="password" 
                      placeholder="Repeat password"
                      name="reppassword"
                      value={user.reppassword} 
                      onChange = {e => oninputChange(e)} 
                      autoComplete="new-password" />

                    </InputGroup>
                    <Button color="success" type='submit' block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}

export default Register;
