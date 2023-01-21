import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Book from "../Components/Book";
import { listBooks } from "../actions/BookActions"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import BookCarousel from "../Components/BookCarousel";

const HomeScreen = ({match, history}) => {

    const nameFromParams = match.params.name
    const authorFromParams = match.params.author;
    const genreFromParams = match.params.genre;
    const ageCategoryFromParams = match.params.ageCategory;
    const publicationNameFromParams = match.params.publicationName;
    const ratingsFromParams = match.params.ratings;
    const noOfReviewsFromParams = match.params.noOfReviews;

    const [name, setname] = useState("")
    const [author, setauthor] = useState("");
    const [genre, setgenre] = useState("");
    const [ageCategory, setageCategory] = useState("");
    const [publicationName, setpublicationName] = useState("");
    const [ratings, setratings] = useState("");
    const [noOfReviews, setnoOfReviews] = useState("")
    // const [message, setmessage] = useState("")

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const bookList = useSelector((state) => state.bookList);
    const { loading, error, Books, page, pages } = bookList;

    useEffect(() => {
        dispatch(
            listBooks(
                pageNumber ,
                nameFromParams ,
                authorFromParams ,
                genreFromParams ,
                ageCategoryFromParams ,
                publicationNameFromParams ,
                ratingsFromParams ,
                noOfReviewsFromParams 
            )
        );
    }, [dispatch, pageNumber, nameFromParams, authorFromParams, genreFromParams, ageCategoryFromParams, publicationNameFromParams, ratingsFromParams, noOfReviewsFromParams, match]);

    const searchSubmitHandler = (e)=>{
        e.preventDefault()
        if(!name && !author && !genre && !ageCategory && !publicationName && !ratings && !noOfReviews) {
            history.push("/")
            // setmessage("Enter atleast one valid filter")
            return
        } else {
            setname("")
            setauthor("")
            setgenre("")
            setageCategory("")
            setpublicationName("")
            setratings("")
            setnoOfReviews("")
            history.push(
                `/page/1/name/${name ? name : "*"}/author/${
                    author ? author : "*"
                }/genre/${genre ? genre : "*"}/ageCategory/${
                    ageCategory ? ageCategory : "*"
                }/publicationName/${
                    publicationName ? publicationName : "*"
                }/ratings/${ratings ? ratings : "*"}/noOfReviews/${
                    noOfReviews ? noOfReviews : "*"
                }`
            );
        }
    }

    return (
        <>
            {(!nameFromParams || nameFromParams === "*") &&
            (!authorFromParams || authorFromParams === "*") &&
            (!genreFromParams || genreFromParams === "*") &&
            (!ageCategoryFromParams || ageCategoryFromParams === "*") &&
            (!publicationNameFromParams || publicationNameFromParams === "*") &&
            (!ratingsFromParams || ratingsFromParams === "*") &&
            (!noOfReviewsFromParams || noOfReviewsFromParams === "*") ? (
                <>
                    <Row className="align-items-center">
                        <Col>
                            <h1>TOP RATED BOOKS</h1>
                        </Col>
                    </Row>
                    <BookCarousel />
                </>
            ) : (
                <a href="/" className="btn btn-dark">
                    Go Back
                </a>
            )}
            <Row className="align-items-center">
                <Col>
                    <h1>BOOKS IN LIBRARY</h1>
                </Col>
                <Col className="text-end">
                    <Button
                        className="my-3"
                        onClick={(e) => {
                            let el = document.getElementById(
                                "search-form-container"
                            );
                            if (el.style.display === "none") {
                                el.style.display = "block";
                            } else {
                                el.style.display = "none";
                            }
                        }}
                    >
                        <i className="fa-regular fa-magnifying-glass"></i>{" "}
                        Search
                    </Button>
                </Col>
            </Row>
            <div
                id="search-form-container"
                style={{ display: "none" }}
                className="mb-3 lms-hs-search-from"
            >
                <Container>
                    {/* {message && <Message variant="danger">{message}</Message>} */}
                    <Row className="justify-content-md-center">
                        <Col>
                            <Form onSubmit={searchSubmitHandler}>
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Group controlId="name">
                                            <Form.Label>Book Name</Form.Label>
                                            <Form.Control
                                                type="name"
                                                placeholder="Enter name"
                                                value={name}
                                                onChange={(e) =>
                                                    setname(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="author">
                                            <Form.Label>Author</Form.Label>
                                            <Form.Control
                                                type="name"
                                                placeholder="Enter author"
                                                value={author}
                                                onChange={(e) =>
                                                    setauthor(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="genre">
                                            <Form.Label>Genre</Form.Label>
                                            <Form.Control
                                                type="name"
                                                placeholder="Enter genre"
                                                value={genre}
                                                onChange={(e) =>
                                                    setgenre(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ageCategory">
                                            <Form.Label>
                                                Age category
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={ageCategory}
                                                onChange={(e) =>
                                                    setageCategory(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select...
                                                </option>
                                                <option value="kids">
                                                    Kids (5 - 12 years)
                                                </option>
                                                <option value="teen">
                                                    Teen (13 - 22 years)
                                                </option>
                                                <option value="middle aged">
                                                    Middle aged (23 - 45 years)
                                                </option>
                                                <option value="old aged">
                                                    Old aged (above 45 years)
                                                </option>
                                                <option value="all">All</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Group controlId="publicationName">
                                            <Form.Label>
                                                Publication Name
                                            </Form.Label>
                                            <Form.Control
                                                type="name"
                                                placeholder="Enter publication name"
                                                value={publicationName}
                                                onChange={(e) =>
                                                    setpublicationName(
                                                        e.target.value
                                                    )
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="ratings">
                                            <Form.Label>Ratings</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={ratings}
                                                onChange={(e) =>
                                                    setratings(e.target.value)
                                                }
                                            >
                                                <option value={null}>
                                                    Select...
                                                </option>
                                                <option value="0">
                                                    Above 0 - Poor
                                                </option>
                                                <option value="1">
                                                    Above 1 - Fair
                                                </option>
                                                <option value="2">
                                                    Above 2 - Good
                                                </option>
                                                <option value="3">
                                                    Above 3 - Very Good
                                                </option>
                                                <option value="4">
                                                    Above 4 - Excellent
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="noOfReviews">
                                            <Form.Label>
                                                No of reviews
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={noOfReviews}
                                                onChange={(e) =>
                                                    setnoOfReviews(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value={null}>
                                                    Select...
                                                </option>
                                                <option value="0">
                                                    Above 0
                                                </option>
                                                <option value="5">
                                                    Above 5
                                                </option>
                                                <option value="10">
                                                    Above 10
                                                </option>
                                                <option value="15">
                                                    Above 15
                                                </option>
                                                <option value="20">
                                                    Above 20
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ marginTop: "3%" }}>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            style={{ width: "100%" }}
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

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
                        nameFromParams={nameFromParams}
                        authorFromParams={authorFromParams}
                        genreFromParams={genreFromParams}
                        ageCategoryFromParams={ageCategoryFromParams}
                        publicationNameFromParams={publicationNameFromParams}
                        ratingsFromParams={ratingsFromParams}
                        noOfReviewsFromParams={noOfReviewsFromParams}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
