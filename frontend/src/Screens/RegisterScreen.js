import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { register, credentialsVerify, OTPResend } from "../actions/UserActions";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [age, setAge] = useState(-1);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [emailOTP, setemailOTP] = useState("")
    const [phoneOTP, setphoneOTP] = useState("")
    const [verifyMessage, setverifyMessage] = useState("")

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, success } = userRegister;

    const userCredentialsVerify = useSelector((state) => state.userCredentialsVerify)
    const { loading: credentialsVerifyLoading, error: credentialsVerifyError, userInfo } = userCredentialsVerify

    const userResendOTP = useSelector((state) => state.userResendOTP)
    const { loading: resendLoading, error: resendError, success: resendSuccess } = userResendOTP

    const redirect = "/login";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const findAgeCategory = (enteredAge) => {

        if( enteredAge >= 0 && enteredAge <= 100 ) {
            setAge(enteredAge)
        } else {
            setAge(-1)
            return
        }

        if (enteredAge >= 0 && enteredAge <= 12) {
            setAgeCategory("kids");
        } else if (enteredAge >= 13 && enteredAge <= 22) {
            setAgeCategory("teen");
        } else if (enteredAge >= 23 && enteredAge <= 45) {
            setAgeCategory("middle aged");
        } else if (enteredAge >= 46 && enteredAge <= 100) {
            setAgeCategory("old aged");
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if( !name || !email || !phone || !password || !confirmPassword || !age || age === -1 ) {
            setMessage("Enter all fields")
            return
        }
        if(password.length <= 5) {
            setMessage("Password length should atleast be 6")
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return
        }
        var expr = /^(0|91)?[6-9][0-9]{9}$/;
        if (!expr.test(phone)) {
            setMessage("Enter a valid mobile number")
            return;
        }
        
        dispatch(register(name, email, phone, password, age, ageCategory));
    };

    const verifySubmitHandler = (e) => {
        e.preventDefault()
        if(!emailOTP || !phoneOTP) {
            setverifyMessage("Enter all fields")
            return
        }
        dispatch(credentialsVerify(email, phone, emailOTP, phoneOTP))
    }

    const resendOTPHandler = (e) => {
        e.preventDefault();
        dispatch(OTPResend(email, phone));
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => findAgeCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" className="mt-3" variant="primary">
                    Register
                </Button>
            </Form>

            {success && (
                <div className="mt-3">
                    {(credentialsVerifyLoading || resendLoading) && <Loader />}
                    {credentialsVerifyError && (
                        <Message variant="danger">
                            {credentialsVerifyError}
                        </Message>
                    )}
                    {resendError && (
                        <Message variant="danger">{resendError}</Message>
                    )}
                    {verifyMessage && (
                        <Message variant="danger">{verifyMessage}</Message>
                    )}
                    {resendSuccess && (
                        <Message variant="success">
                            OTP has been sent successfully
                        </Message>
                    )}
                    <Form>
                        <Form.Group controlId="emailOTP">
                            <Form.Label>Email OTP</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the OTP recieved by your mail-id"
                                value={emailOTP}
                                onChange={(e) => setemailOTP(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="phoneOTP">
                            <Form.Label>Phone OTP</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the OTP recieved by your phone number"
                                value={phoneOTP}
                                onChange={(e) => setphoneOTP(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                    <Button type="button" onClick={verifySubmitHandler} className="mt-3" variant="primary">
                        Verify
                    </Button>
                    <Button
                        className="btn btn-primary mt-3 ms-3"
                        onClick={resendOTPHandler}
                    >
                        Resend OTP
                    </Button>
                </div>
            )}

            <Row className="py-3">
                <Col>
                    Have an Account? <a href={"/login"}>Login</a>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
