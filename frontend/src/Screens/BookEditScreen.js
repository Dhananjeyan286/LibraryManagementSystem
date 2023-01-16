import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { listBookDetails, updateBook } from "../actions/BookActions";
import { BOOK_UPDATE_RESET } from "../constants/BookConstants";
import axios from "axios";

const BookEditScreen = ({ match, history }) => {
    const bookId = match.params.id;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [ageCategory, setAgeCategory] = useState("kids");
    const [publishedDate, setPublishedDate] = useState(new Date());
    const [noOfPages, setNoOfPages] = useState(0);
    const [publicationName, setPublicationName] = useState("");
    const [editionNumber, setEditionNumber] = useState(0);
    const [finePerDay, setFinePerDay] = useState(0);
    const [noOfReviews, setNoOfReviews] = useState(0);
    const [ratings, setRatings] = useState(0);
    const [floorNumber, setFloorNumber] = useState(0);
    const [rackNumber, setRackNumber] = useState(0);
    const [rowNumber, setRowNumber] = useState(0);
    const [positionFromLeft, setPositionFromLeft] = useState(0);
    const [message, setMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const bookDetails = useSelector((state) => state.bookDetails);
    const { loading, error, book } = bookDetails;

    const bookUpdate = useSelector((state) => state.bookUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = bookUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: BOOK_UPDATE_RESET });
            setSuccessMessage("Book details updated successfully")
            setName(book.name);
            setImage(book.image);
            setDescription(book.description);
            setAuthor(book.author);
            setGenre(book.genre);
            setAgeCategory(book.ageCategory);
            setNoOfPages(book.noOfPages);
            setPublicationName(book.publicationName);
            setEditionNumber(book.editionNumber);
            setFinePerDay(book.finePerDay);
            setNoOfReviews(book.noOfReviews);
            setRatings(book.ratings);
            setFloorNumber(book.floorNumber);
            setRackNumber(book.rackNumber);
            setRowNumber(book.rowNumber);
            setPositionFromLeft(book.positionFromLeft);
            let day = book.publishedDate.substring(8, 10);
            let month = book.publishedDate.substring(5, 7);
            let year = book.publishedDate.substring(0, 4);
            let finalDate = year + "-" + month + "-" + day;
            setPublishedDate(finalDate);
        } else {
            if (!book.name || book._id !== bookId) {
                dispatch(listBookDetails(bookId));
            } else {
                setName(book.name);
                setImage(book.image);
                setDescription(book.description);
                setAuthor(book.author);
                setGenre(book.genre);
                setAgeCategory(book.ageCategory);
                setNoOfPages(book.noOfPages);
                setPublicationName(book.publicationName);
                setEditionNumber(book.editionNumber);
                setFinePerDay(book.finePerDay);
                setNoOfReviews(book.noOfReviews);
                setRatings(book.ratings);
                setFloorNumber(book.floorNumber);
                setRackNumber(book.rackNumber);
                setRowNumber(book.rowNumber);
                setPositionFromLeft(book.positionFromLeft);
                let day = book.publishedDate.substring(8, 10);
                let month = book.publishedDate.substring(5, 7);
                let year = book.publishedDate.substring(0, 4);
                let finalDate = year + "-" + month + "-" + day;
                setPublishedDate(finalDate);
            }
        }
    }, [dispatch, history, bookId, book, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!name || !image || !description || !author || !genre || !ageCategory || !publishedDate || noOfPages < 1 || !publicationName || editionNumber < 0 || finePerDay < 0 || noOfReviews < 0 || !ratings || floorNumber < 0 || rackNumber < 1 || rowNumber < 1 || positionFromLeft < 1) {
            setMessage("Enter all fields with proper values")
            return
        }
        dispatch(updateBook({_id: bookId, name, image, description, author, genre, ageCategory, publishedDate, noOfPages, publicationName, editionNumber, finePerDay, noOfReviews, ratings, floorNumber, rackNumber, rowNumber, positionFromLeft}))
    };

    return (
        <>
            <a href="/admin/booklist" className="btn btn-dark my-3">
                Go Back
            </a>
            <FormContainer>
                <h1>Edit Book</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}
                {successMessage && (
                    <Message variant={"success"}>{successMessage}</Message>
                )}
                {message && <Message variant={"danger"}>{message}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                className="mt-3"
                                type="file"
                                label="Choose File"
                                custom="true"
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="genre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="ageCategory">
                                <Form.Label>Age Category</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-kids"
                                    label="kids (0 - 12 years)"
                                    name="isAgeCategoryChecked"
                                    checked={
                                        ageCategory === "kids" ? true : false
                                    }
                                    defaultChecked="true"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgeCategory("kids");
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
                                    id="LMS-book-edit-checkbox-teen"
                                    label="teen (13 - 22 years)"
                                    name="isAgeCategoryChecked"
                                    checked={
                                        ageCategory === "teen" ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgeCategory("teen");
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox3"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-middle-aged"
                                    label="middle aged (23 - 45 years)"
                                    name="isAgeCategoryChecked"
                                    checked={
                                        ageCategory === "middle aged"
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgeCategory("middle aged");
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox4"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-old-aged"
                                    label="old aged (above 45 years)"
                                    name="isAgeCategoryChecked"
                                    checked={
                                        ageCategory === "old aged"
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgeCategory("old aged");
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="ps-0"
                                controlId="checkbox5"
                            >
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-all"
                                    label="all (0 - 100 years)"
                                    name="isAgeCategoryChecked"
                                    checked={
                                        ageCategory === "all" ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgeCategory("all");
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="publishedDate">
                            <Form.Label>Published Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter published date"
                                value={publishedDate}
                                onChange={(e) =>
                                    setPublishedDate(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="noOfPages">
                            <Form.Label>No of pages</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter no of pages"
                                value={noOfPages}
                                onChange={(e) => setNoOfPages(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="publicationName">
                            <Form.Label>Publication Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter publication name"
                                value={publicationName}
                                onChange={(e) =>
                                    setPublicationName(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="editionNumber">
                            <Form.Label>Edition Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter edition number"
                                value={editionNumber}
                                onChange={(e) =>
                                    setEditionNumber(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="finePerDay">
                            <Form.Label>Fine Per Day</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter fine per day"
                                value={finePerDay}
                                onChange={(e) => setFinePerDay(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="noOfReviews">
                            <Form.Label>No Of Reviews</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter no of reviews"
                                value={noOfReviews}
                                onChange={(e) => setNoOfReviews(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="ratings">
                            <Form.Label>Ratings</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                max={5}
                                placeholder="Enter ratings"
                                value={ratings}
                                onChange={(e) => setRatings(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="floorNumber">
                            <Form.Label>Floor Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter floor number"
                                value={floorNumber}
                                onChange={(e) => setFloorNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="rackNumber">
                            <Form.Label>Rack Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter rack number"
                                value={rackNumber}
                                onChange={(e) => setRackNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="rowNumber">
                            <Form.Label>Row Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter row number"
                                value={rowNumber}
                                onChange={(e) => setRowNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="positionFromLeft">
                            <Form.Label>Position From Left</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter position from left"
                                value={positionFromLeft}
                                onChange={(e) =>
                                    setPositionFromLeft(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-3"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default BookEditScreen;
