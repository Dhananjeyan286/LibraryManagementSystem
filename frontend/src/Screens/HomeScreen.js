import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Book from "../Components/Book";
import { listBooks } from "../actions/BookActions"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const bookList = useSelector((state) => state.bookList);
    const { loading, error, Books } = bookList;

    useEffect(() => {
        dispatch(listBooks())
    }, [dispatch]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {Books.map((book) => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <Book book={book} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
