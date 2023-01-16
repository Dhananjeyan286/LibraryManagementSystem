import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Book from "../Components/Book";
import { listBooks } from "../actions/BookActions"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import BookCarousel from "../Components/BookCarousel";

const HomeScreen = ({match}) => {

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const bookList = useSelector((state) => state.bookList);
    const { loading, error, Books, page, pages } = bookList;

    useEffect(() => {
        dispatch(listBooks(pageNumber));
    }, [dispatch, pageNumber]);
    return (
        <>
            <BookCarousel />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {Books.map((book) => (
                            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
