import React from "react";
import { Card } from "react-bootstrap";
import Ratings from "./Ratings";

const Book = ({ book }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/book/${book._id}`}>
                <Card.Img
                    src={book.image}
                    height="300px"
                    width="200px"
                    variant="top"
                />
            </a>

            <Card.Body>
                <a href={`/book/${book._id}`}>
                    <Card.Title as="div">
                        <strong>{book.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="div">
                    <div className="my-3">Written by {book.author}</div>
                </Card.Text>

                <Card.Text as="div">
                    <Ratings
                        value={book.ratings}
                        text={` from ${book.noOfReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="div">Genre: {book.genre}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Book;
