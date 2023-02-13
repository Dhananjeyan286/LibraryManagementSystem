import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { useState, useEffect } from "react";
import { individualRequest, editRequest } from "../actions/RequestActions"

const UserEditScreen = ({ match, history }) => {
    const requestId = match.params.id;
 
    const [isBooked, setisBooked] = useState(false);
    const [bookedAt, setbookedAt] = useState(new Date());
    const [isBorrowed, setisBorrowed] = useState(false)
    const [borrowedAt, setborrowedAt] = useState(new Date());
    const [isReturned, setisReturned] = useState(false);
    const [returnedAt, setreturnedAt] = useState(new Date());
    const [isCancelled, setisCancelled] = useState(false);
    const [cancelledAt, setcancelledAt] = useState(new Date());
    const [isClosed, setisClosed] = useState(false);
    const [closedAt, setclosedAt] = useState(new Date());
    const [isBookScanned, setisBookScanned] = useState(false);
    const [isUserScanned, setisUserScanned] = useState(false);
    const [returnedOnOrBefore, setreturnedOnOrBefore] = useState(new Date());
    const [message, setmessage] = useState("")

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const fetchIndividualRequestReducer = useSelector((state) => state.fetchIndividualRequest);
    const { loading, error, request } = fetchIndividualRequestReducer;

    const editRequestReducer = useSelector((state) => state.editRequest);
    const { loading: editedLoading, error: editedError, request: editedRequest, success } = editRequestReducer;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            if(!request.bookedAt || request._id.toString() !== requestId.toString()) { ///don't check request.isBooked because req.isBooked is a boolean variable which might be true/false
                dispatch(individualRequest(userInfo._id, requestId));
            } else {
                setisBooked(request.isBooked)
                setbookedAt(request.bookedAt);
                setisBorrowed(request.isBorrowed);
                setborrowedAt(request.borrowedAt);
                setisReturned(request.isReturned);
                setreturnedAt(request.returnedAt);
                setreturnedAt(request.returnedAt);
                setisClosed(request.isClosed);
                setclosedAt(request.closedAt);
                setisCancelled(request.isCancelled);
                setcancelledAt(request.cancelledAt);
                setisBookScanned(request.isBookScanned);
                setisUserScanned(request.isUserScanned);
                setreturnedOnOrBefore(request.returnedOnOrBefore);
            }
        } else {
            history.push("/login")
        }
    }, [dispatch, userId, user, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !age || age === -1) {
            setMessage("Enter all fields");
            return;
        }
        var expr = /^(0|91)?[6-9][0-9]{9}$/;
        if (!expr.test(phone)) {
            setMessage("Enter a valid mobile number");
            return;
        }
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                isAdmin,
                phone,
                age,
                ageCategory,
            })
        );
    };

    return (
        <>
            <a href="/admin/userlist" className="btn btn-dark my-3">
                Go Back
            </a>
            <FormContainer>
                <h1>Edit Request</h1>
                {editedLoading && <Loader />}
                {editedError && (
                    <Message variant="danger">{editedError}</Message>
                )}
                {success && <Message variant="success">{success}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Form.Group controlId="isBooked">
                                <Form.Label>Is the book blocked?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBooked-true"
                                    label="True"
                                    name="isBooked"
                                    checked={isBooked === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBooked(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBooked-false"
                                    label="False"
                                    name="isBooked"
                                    checked={isBooked === false ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBooked(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="bookedAt">
                            <Form.Label>The book was blocked at</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={bookedAt}
                                onChange={(e) => setbookedAt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="isBorrowed">
                                <Form.Label>Is the book borrowed?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBorrowed-true"
                                    label="True"
                                    name="isBorrowed"
                                    checked={isBorrowed === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBorrowed(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBorrowed-false"
                                    label="False"
                                    name="isBorrowed"
                                    checked={
                                        isBorrowed === false ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBorrowed(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="borrowedAt">
                            <Form.Label>The book was borrowed at</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={borrowedAt}
                                onChange={(e) => setborrowedAt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="isCancelled">
                                <Form.Label>
                                    Is the request cancelled?
                                </Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isCancelled-true"
                                    label="True"
                                    name="isCancelled"
                                    checked={
                                        isCancelled === true ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisCancelled(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isCancelled-false"
                                    label="False"
                                    name="isCancelled"
                                    checked={
                                        isCancelled === false ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisCancelled(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="cancelledAt">
                            <Form.Label>The book was cancelled at</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={cancelledAt}
                                onChange={(e) => setcancelledAt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="isReturned">
                                <Form.Label>Is the book returned?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isReturned-true"
                                    label="True"
                                    name="isReturned"
                                    checked={isReturned === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisReturned(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isReturned-false"
                                    label="False"
                                    name="isReturned"
                                    checked={
                                        isReturned === false ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisReturned(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="returnedAt">
                            <Form.Label>The book was returned at</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={returnedAt}
                                onChange={(e) => setreturnedAt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="isClosed">
                                <Form.Label>Is the request closed?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isClosed-true"
                                    label="True"
                                    name="isClosed"
                                    checked={isClosed === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisClosed(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isClosed-false"
                                    label="False"
                                    name="isClosed"
                                    checked={isClosed === false ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisClosed(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="closedAt">
                            <Form.Label>The book was closed at</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={closedAt}
                                onChange={(e) => setclosedAt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="isBookScanned">
                                <Form.Label>Is the book tag scanned while borrowing?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBookScanned-true"
                                    label="True"
                                    name="isBookScanned"
                                    checked={isBookScanned === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBookScanned(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isBookScanned-false"
                                    label="False"
                                    name="isBookScanned"
                                    checked={isBookScanned === false ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisBookScanned(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="isUserScanned">
                                <Form.Label>Is the user tag scanned while borrowing?</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isUserScanned-true"
                                    label="True"
                                    name="isUserScanned"
                                    checked={isUserScanned === true ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisUserScanned(true);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox2"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-isUserScanned-false"
                                    label="False"
                                    name="isUserScanned"
                                    checked={isUserScanned === false ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setisUserScanned(false);
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="returnedOnOrBefore">
                            <Form.Label>The book needs to be returned on or before</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                // placeholder="Enter email"
                                value={returnedOnOrBefore}
                                onChange={(e) => setreturnedOnOrBefore(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
