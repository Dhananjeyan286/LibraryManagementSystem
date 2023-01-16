import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Ratings from "../Components/Ratings";
import { useDispatch, useSelector } from "react-redux"
import { listBookDetails } from "../actions/BookActions"
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const BookScreen = ({ match }) => {
    const dispatch = useDispatch()
    const bookDetails = useSelector((state) => state.bookDetails)
    const {loading, error, book} = bookDetails

    useEffect(() => {
        dispatch(listBookDetails(match.params.id))
    }, [dispatch, match]);

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
                                <strong>Description:</strong> {book.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Age Category:</Col>
                                        <Col>
                                            <strong>
                                                {book.ageCategory === "kids"
                                                    ? "0-12"
                                                    : book.ageCategory ===
                                                      "teen"
                                                    ? "13-22"
                                                    : book.ageCategory ===
                                                      "middle aged"
                                                    ? "23-45"
                                                    : "above 45"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>No.of pages:</Col>
                                        <Col>
                                            <strong>{book.noOfPages}</strong>
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
                                                {String(book.publishedDate).substring(8,10) + "-" + String(book.publishedDate).substring(5,7) + "-" + String(book.publishedDate).substring(0,4)}
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
                                            <strong>{book.floorNumber}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Rack Number:</Col>
                                        <Col>
                                            <strong>{book.rackNumber}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Row Number:</Col>
                                        <Col>
                                            <strong>{book.rowNumber}</strong>
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
                                    <Button className="btn-block" type="button">
                                        Check Book Availability
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default BookScreen;
