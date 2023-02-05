import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { individualRequest } from "../actions/RequestActions"
import { convertDateToString } from "../utils/conversion"

const RequestScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const fetchIndividualRequestReducer = useSelector((state) => state.fetchIndividualRequest);
    const { loading, error, request } = fetchIndividualRequestReducer;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo) {
            dispatch(individualRequest(userInfo._id, match.params.id));
        } else {
            history.push("/login");
        }
    }, [dispatch, match, userInfo, history]);

    return (
        <>
            <a className="btn btn-dark my-3" href={userInfo.isAdmin ? "/admin/requestlist" : "/profile"}>
                Go Back
            </a>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : request.bookId && (
                <>
                    <Row>
                        <Col md={3}>
                            <Image
                                src={request.bookId.image}
                                alt={request.bookId.name}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Book name:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.name}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Author:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.author}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Genre:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.genre}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Age Category:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId
                                                        .ageCategory === "kids"
                                                        ? "0-12"
                                                        : request.bookId
                                                              .ageCategory ===
                                                          "teen"
                                                        ? "13-22"
                                                        : request.bookId
                                                              .ageCategory ===
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
                                                <strong>
                                                    {request.bookId.noOfPages}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Publication Name:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.publicationName}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Published Date:</Col>
                                            <Col>
                                                <strong>
                                                    {/* {request.bookId.publishedDate} */}
                                                    {String(request.bookId.publishedDate)
                                                        .substring(8, 10) +
                                                        "-" +
                                                        String(
                                                            request.bookId
                                                                .publishedDate
                                                        ).substring(5, 7) +
                                                        "-" +
                                                        String(
                                                            request.bookId
                                                                .publishedDate
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
                                                    {request.bookId.editionNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Floor Number:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.floorNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Rack Number:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.rackNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Row Number:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.rowNumber}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Position From Left:</Col>
                                            <Col>
                                                <strong>
                                                    {request.bookId.positionFromLeft}
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
                                                    ₹{request.bookId.finePerDay}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md={5}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Is It Booked:</Col>
                                            <Col>
                                                {request.isBooked ? (
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {request.bookedAt && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Borrowed At:</Col>
                                                <Col>
                                                    {convertDateToString(new Date(request.bookedAt))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Is It Borrowed:</Col>
                                            <Col>
                                                {request.isBorrowed ? (
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {request.borrowedAt && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Borrowed At:</Col>
                                                <Col>
                                                    {convertDateToString(new Date(request.borrowedAt))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Is It Returned:</Col>
                                            <Col>
                                                {request.isReturned ? (
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {request.returnedAt && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Returned At:</Col>
                                                <Col>
                                                    {convertDateToString(new Date(request.returnedAt))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Is It Cancelled:</Col>
                                            <Col>
                                                {request.isCancelled ? (
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {request.cancelledAt && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Cancelled At:</Col>
                                                <Col>
                                                    {convertDateToString(new Date(request.cancelledAt))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    {request.returnedOnOrBefore && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Book Should Be Returned On Or Before:</Col>
                                                <Col>
                                                    {convertDateToString(new Date(request.returnedOnOrBefore))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Fine Amount For Delayed Return:</Col>
                                            <Col>
                                                ₹{request.fineAmount}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default RequestScreen;
