import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopBooks } from "../actions/BookActions";

const BookCarousel = () => {
    const dispatch = useDispatch();

    const bookTopRated = useSelector((state) => state.bookTopRated);
    const { loading, error, books } = bookTopRated;

    useEffect(() => {
        dispatch(listTopBooks());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {books.map((book) => (
                <Carousel.Item key={book._id}>
                    <a href={`/book/${book._id}`}>
                        <Image src={book.image} alt={book.name} fluid />
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {book.name} by {book.author}
                            </h2>
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default BookCarousel;
