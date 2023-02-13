import { Button, Card, Col, Row } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listSuggestions } from "../actions/RequestActions"

const SuggestionCard = () => {
    const dispatch = useDispatch();

    const getSuggestions = useSelector((state) => state.getSuggestions);
    const { loading, error, suggestions } = getSuggestions;

    useEffect(() => {
        dispatch(listSuggestions());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div className="suggestion-div-border">
            <Row>
                {suggestions.map((book) => (
                    <Col key={book._id} sm={6} md={4} lg={3} xl={2}>
                        <Card className="p-3 rounded">
                            <Card.Img
                                src={book.image}
                                height="150px"
                                variant="top"
                            />

                            <Card.Body className="suggestion-card-body">
                                <Card.Title as="div" className="text-align-center">
                                    <strong>
                                        {book.name.length > 16
                                            ? book.name.substring(0, 16) + "..."
                                            : book.name}
                                    </strong>
                                </Card.Title>

                                <div className="text-align-center">
                                    <a href={`/book/${book._id}`}>
                                        <Button className="suggestion-button btn-dark btn-sm">
                                            KNOW MORE
                                        </Button>
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};


export default SuggestionCard
