import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"

const Paginate = ({ pages, page, isAdmin = false, nameFromParams, authorFromParams, genreFromParams, ageCategoryFromParams, publicationNameFromParams, ratingsFromParams,noOfReviewsFromParams }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            !isAdmin
                                ? ((!nameFromParams || nameFromParams === "*") &&
                                  (!authorFromParams ||
                                      authorFromParams === "*") &&
                                  (!genreFromParams ||
                                      genreFromParams === "*") &&
                                  (!ageCategoryFromParams ||
                                      ageCategoryFromParams === "*") &&
                                  (!publicationNameFromParams ||
                                      publicationNameFromParams === "*") &&
                                  (!ratingsFromParams ||
                                      ratingsFromParams === "*") &&
                                  (!noOfReviewsFromParams ||
                                      noOfReviewsFromParams === "*")) ? `/page/${x + 1}` 
                                      : 
                                      `/page/${x + 1}/name/${nameFromParams}/author/${authorFromParams}/genre/${genreFromParams}/ageCategory/${ageCategoryFromParams}/publicationName/${publicationNameFromParams}/ratings/${ratingsFromParams}/noOfReviews/${noOfReviewsFromParams}`
                                : `/admin/booklist/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
