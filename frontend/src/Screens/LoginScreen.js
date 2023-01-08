import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { login } from "../actions/UserActions";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [loginVia, setLoginVia] = useState("email")

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if( loginVia === "email" ) {
            setPhone("")
        } else if ( loginVia === "phone" ) {
            setEmail("")
        }
        dispatch(login(email, phone, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Form.Group as={Col} controlId="checkbox1">
                        <Form.Check
                            type="radio"
                            id="LMS-login-checkbox-email"
                            label="Login using email"
                            name="isEmailChecked"
                            defaultChecked="true"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLoginVia("email");
                                }
                            }}
                            className="form-checkbox"
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="checkbox2">
                        <Form.Check
                            type="radio"
                            id="LMS-login-checkbox-phone"
                            label="Login using phone number"
                            name="isEmailChecked"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLoginVia("phone");
                                }
                            }}
                            className="form-checkbox"
                        />
                    </Form.Group>
                </Row>

                {loginVia === "email" ? (
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                ) : (
                    <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                )}

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className="mt-3" type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <a
                        href={ "/register" }
                    >
                        Register
                    </a>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
