import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Ratings from "../Components/Ratings";
import { useDispatch, useSelector } from "react-redux"
import { listBookDetails, createBookReview } from "../actions/BookActions"
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { BOOK_CREATE_REVIEW_RESET } from "../constants/BookConstants";
import { canCancel, cancel, isBooked, createRequest } from "../actions/RequestActions"

const BookScreen = ({ match }) => {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("") 

    const bookDetails = useSelector((state) => state.bookDetails)
    const {loading, error, book} = bookDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const isBookedReducer = useSelector((state) => state.isBooked);
    const { request: isBookedValue, loading: isBookedLoading, error: isBookedError } = isBookedReducer;

    const canCancelReducer = useSelector((state) => state.canCancel);
    const { request: canCancelValue, loading: canCancelLoading, error: canCancelError } = canCancelReducer;

    const cancelReducer = useSelector((state) => state.cancel);
    const { loading: loadingCancel, request: successCancel, error: errorCancel} = cancelReducer

    const createRequestReducer = useSelector((state) => state.requestCreate);
    const { loading: loadingRequest, request: successRequest, error: errorRequest} = createRequestReducer

    const bookReviewCreate = useSelector((state) => state.bookReviewCreate);
    const { success: successBookReview, error: errorBookReview } = bookReviewCreate;

    useEffect(() => {
        if (successBookReview) {
            alert("Review Submitted!");
            setRating(0);
            setComment("");
            dispatch({ type: BOOK_CREATE_REVIEW_RESET });
        }
        dispatch(listBookDetails(match.params.id));
        if(userInfo) {
            dispatch(canCancel(userInfo._id, match.params.id));
            dispatch(isBooked(userInfo._id, match.params.id));
        }
    }, [dispatch, match, successBookReview, userInfo, successRequest, successCancel]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(!rating || !comment) {
            setMessage("Enter all fields")
            return
        }
        dispatch(createBookReview(match.params.id, {rating, comment}));
    };

    const createRequestHandler = function () {
        if(window.confirm("Are you sure you want to raise a request to borrow the book?")) {
            dispatch(createRequest(userInfo._id, match.params.id));
            return
        }
    }

    const cancelRequestHandler = function() {
        if(window.confirm("Are you sure you want to cancel the request?")) {
            dispatch(cancel(userInfo._id, match.params.id))
            return
        }
    }

    return (
        <>
            <a className="btn btn-dark my-3" href="/">
                Go Back
            </a>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={3}>
                            <Image src={book.image} alt={book.name} fluid />
                        </Col>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{book.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Author:</strong> {book.author}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Ratings
                                        value={book.ratings}
                                        text={` from ${book.noOfReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Genre:</strong> {book.genre}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Description:</strong>{" "}
                                    {book.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Department:</Col>
                                            <Col>
                                                <strong>
                                                    {book.department}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>No.of pages:</Col>
                                            <Col>
                                                <strong>
                                                    {book.noOfPages}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Publication Name:</Col>
                                            <Col>
                                                <strong>
                                                    {book.publicationName}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Published Date:</Col>
                                            <Col>
                                                <strong>
                                                    {/* {book.publishedDate} */}
                                                    {String(
                                                        book.publishedDate
                                                    ).substring(8, 10) +
                                                        "-" +
                                                        String(
                                                            book.publishedDate
                                                        ).substring(5, 7) +
                                                        "-" +
                                                        String(
                                                            book.publishedDate
                                                        ).substring(0, 4)}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Edition Number:</Col>
                                            <Col>
                                                <strong>
                                                    {book.editionNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Floor Number:</Col>
                                            <Col>
                                                <strong>
                                                    {book.floorNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Rack Number:</Col>
                                            <Col>
                                                <strong>
                                                    {book.rackNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Row Number:</Col>
                                            <Col>
                                                <strong>
                                                    {book.rowNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Position From Left:</Col>
                                            <Col>
                                                <strong>
                                                    {book.positionFromLeft}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Fine Per Day On Delayed Return:
                                            </Col>
                                            <Col>
                                                <strong>
                                                    ₹{book.finePerDay}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* {userInfo ? !isBookedValue ? (bookedbutton) : canCancelValue ? (cancelButton) : (disablecancelbutton) : (notloggedin)} */}

                                    <ListGroup.Item>
                                        {(isBookedLoading ||
                                            canCancelLoading ||
                                            loadingCancel ||
                                            loadingRequest) && <Loader />}
                                        {isBookedError && (
                                            <Message variant="danger">
                                                {isBookedError}
                                            </Message>
                                        )}
                                        {canCancelError && (
                                            <Message variant="danger">
                                                {canCancelError}
                                            </Message>
                                        )}
                                        {errorCancel && (
                                            <Message variant="danger">
                                                {errorCancel}
                                            </Message>
                                        )}
                                        {errorRequest && (
                                            <Message variant="danger">
                                                {errorRequest}
                                            </Message>
                                        )}
                                        {successCancel && (
                                            <Message variant="success">
                                                {successCancel}
                                            </Message>
                                        )}
                                        {successRequest && (
                                            <Message variant="success">
                                                {successRequest}
                                            </Message>
                                        )}
                                        {userInfo ? (
                                            !isBookedValue ? (
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    id="lms-raise-request-to-borrow"
                                                    onClick={
                                                        createRequestHandler
                                                    }
                                                >
                                                    Raise request to borrow
                                                </Button>
                                            ) : canCancelValue ? (
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    id="lms-raise-request-to-borrow"
                                                    onClick={
                                                        cancelRequestHandler
                                                    }
                                                >
                                                    Cancel Request
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    id="lms-raise-request-to-borrow"
                                                    disabled={true}
                                                >
                                                    Cancel Request
                                                </Button>
                                            )
                                        ) : (
                                            <Message>
                                                Please{" "}
                                                <a href="/login">sign in</a> to
                                                borrow the book{" "}
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {book.reviews.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            <ListGroup variant="flush">
                                {book.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>
                                            {review.user && review.user.name}
                                        </strong>
                                        <Ratings value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {message && (
                                        <Message variant="danger">
                                            {message}
                                        </Message>
                                    )}
                                    {errorBookReview && (
                                        <Message variant="danger">
                                            {errorBookReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="mt-3"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <a href="/login">sign in</a>{" "}
                                            to write a review{" "}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default BookScreen;
