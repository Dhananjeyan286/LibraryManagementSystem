import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getUserDetails, updateUserProfile, payFine } from "../actions/UserActions";
import { userRequest } from "../actions/RequestActions"
import { convertDateToString } from "../utils/conversion"
import GPay from "@google-pay/button-react";

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

    const finePayment = useSelector((state) => state.finePayment);
    const { loading: finePaymentLoading, error: finePaymentError, success: finePaymentSuccess } = finePayment;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, error : errorInUpdation } = userUpdateProfile;

    const userRequestReducer = useSelector((state) => state.fetchUserRequest);
    const { loading: userRequestLoading, error: userRequestError, request } = userRequestReducer;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
                dispatch(userRequest(userInfo._id))
            } else {
                setName(user.name);
                setEmail(user.email);
                setPhone(user.phone);
                setAge(user.age);
                setAgeCategory(user.ageCategory);
            }
        }
    }, [dispatch, history, userInfo, user]);

    useEffect(() => {
        if(finePaymentSuccess) {
            dispatch(getUserDetails("profile"))
        }
    }, [dispatch, finePaymentSuccess])

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

    const paymentSuccessHandler = (paymentData) => {
        dispatch(payFine(paymentData));
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {errorInUpdation && (
                    <Message variant="danger">{errorInUpdation}</Message>
                )}
                {success && (
                    <Message variant="success">Profile Updated</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
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
                                onChange={(e) =>
                                    findAgeCategory(e.target.value)
                                }
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
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-3"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>My history of requests</h2>
                {userRequestLoading ? (
                    <Loader />
                ) : userRequestError ? (
                    <Message variant="danger">{userRequestError}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>BOOK NAME</th>
                                <th>BOOKED AT</th>
                                <th>IS IT BORROWED</th>
                                <th>IS IT RETURNED</th>
                                <th>IS IT CANCELLED</th>
                                <th>FINE AMOUNT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.map((req) => (
                                <tr key={req._id}>
                                    <td>{req.bookId.name}</td>
                                    <td>
                                        {convertDateToString(
                                            new Date(req.bookedAt)
                                        )}
                                    </td>
                                    <td className="lms-text-center">
                                        {req.isBorrowed ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="lms-text-center">
                                        {req.isReturned ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="lms-text-center">
                                        {req.isCancelled ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td className="lms-text-center">
                                        ₹{req.fineAmount}
                                    </td>
                                    <td>
                                        <a
                                            href={`/request/${req._id}`}
                                            className="lms-btn btn-sm btn-dark"
                                        >
                                            Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {finePaymentError && (
                    <Message variant="danger">{finePaymentError}</Message>
                )}
                {finePaymentSuccess && (
                    <Message variant="success">
                        Payment has been successfully made.
                    </Message>
                )}
                {loading || finePaymentLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <h1>FINE PAYMENT</h1>
                        <h5>
                            Pending fine amount to be paid:{" "}
                            <strong>₹{user.fineAmount}</strong>
                        </h5>
                        {user.fineAmount > 0 && (
                            <GPay
                                className="mt-2"
                                environment="TEST"
                                paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                        {
                                            type: "CARD",
                                            parameters: {
                                                allowedAuthMethods: [
                                                    "PAN_ONLY",
                                                    "CRYPTOGRAM_3DS",
                                                ],
                                                allowedCardNetworks: [
                                                    "MASTERCARD",
                                                    "VISA",
                                                ],
                                            },
                                            tokenizationSpecification: {
                                                type: "PAYMENT_GATEWAY",
                                                parameters: {
                                                    gateway: "example",
                                                    gatewayMerchantId:
                                                        "exampleGatewayMerchantId",
                                                },
                                            },
                                        },
                                    ],
                                    merchantInfo: {
                                        merchantId: "12345678901234567890",
                                        merchantName: "Demo Merchant",
                                    },
                                    transactionInfo: {
                                        totalPriceStatus: "FINAL",
                                        totalPriceLabel: "Total",
                                        totalPrice: user.fineAmount.toString(),
                                        currencyCode: "INR",
                                        countryCode: "IN",
                                    },
                                    shippingAddressRequired: false,
                                    //   callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
                                    callbackIntents: ["PAYMENT_AUTHORIZATION"],
                                }}
                                onLoadPaymentData={paymentSuccessHandler}
                                onPaymentAuthorized={(paymentData) => {
                                    //   console.log("Payment Authorised Success", paymentData);
                                    return { transactionState: "SUCCESS" };
                                }}
                                //   onPaymentDataChanged={(paymentData) => {
                                //       console.log("On Payment Data Changed", paymentData);
                                //       return {};
                                //   }}
                                //   existingPaymentMethodRequired="false"
                                //   buttonColor="black"
                                buttonType="pay"
                            />
                        )}
                    </>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
