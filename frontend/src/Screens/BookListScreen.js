import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listBooks, deleteBook, createBook } from "../actions/BookActions";
import { BOOK_CREATE_RESET } from "../constants/BookConstants";
import Paginate from "../Components/Paginate";

const BookListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const bookList = useSelector((state) => state.bookList);
    const { loading, error, Books: books, page, pages } = bookList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const bookDelete = useSelector((state) => state.bookDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = bookDelete;

    const bookCreate = useSelector((state) => state.bookCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, book: createdBook} = bookCreate;

    useEffect(() => {
        dispatch({ type: BOOK_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login");
        }

        if (successCreate) {
            history.push(`/admin/book/${createdBook._id}/edit`);
        } else {
            dispatch(listBooks(pageNumber));
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdBook, pageNumber]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteBook(id));
        }
    };

    const createBookHandler = () => {
        dispatch(createBook());
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Books</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createBookHandler}>
                        <i className="fas fa-plus"></i> Create Book
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>AUTHOR</th>
                                <th>GENRE</th>
                                <th>PUBLICATION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books &&
                                books.map((book) => (
                                    <tr key={book._id}>
                                        <td>{book._id}</td>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.publicationName}</td>
                                        <td>
                                            <a
                                                href={`/admin/book/${book._id}/edit`}
                                                className="me-2"
                                            >
                                                <Button
                                                    variant="light"
                                                    className="btn-sm"
                                                    style={{
                                                        backgroundColor:
                                                            "yellow",
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </a>
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() =>
                                                    deleteHandler(book._id)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default BookListScreen;
