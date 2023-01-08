import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/UserActions";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [age, setAge] = useState(-1);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, error : errorInUpdation } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
                setPhone(user.phone);
                setAge(user.age);
                setAgeCategory(user.ageCategory);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const findAgeCategory = (enteredAge) => {
        if (enteredAge >= 0 && enteredAge <= 100) {
            setAge(enteredAge);
        } else {
            setAge(-1);
            return;
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
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if ( !name || !email || !phone || age === -1 ) {
            setMessage("Enter all fields");
            return;
        }
        if (password !== "" && password.length <= 5) {
            setMessage("Password length should atleast be 6");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        var expr = /^(0|91)?[6-9][0-9]{9}$/;
        if (!expr.test(phone)) {
            setMessage("Enter a valid mobile number");
            return;
        }

        dispatch(
            updateUserProfile({ id: user._id, name, email, phone, password, age, ageCategory })
        );
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {errorInUpdation && <Message variant="danger">{errorInUpdation}</Message>}
                {success && (
                    <Message variant="success">Profile Updated</Message>
                )}
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

                    <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => findAgeCategory(e.target.value)}
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

                    <Button type="submit" className="mt-3" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
