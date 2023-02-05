import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { allRequest } from "../actions/RequestActions"
import { convertDateToString } from "../utils/conversion"

const RequestListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const fetchAllRequest = useSelector((state) => state.fetchAllRequest);
    const { loading, error, request } = fetchAllRequest;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(allRequest());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    return (
        <>
            <h1>HISTORY OF REQUESTS</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>BOOK NAME</th>
                            <th>BOOKED AT</th>
                            <th>IS IT BORROWED</th>
                            <th>IS IT RETURNED</th>
                            <th>IS IT CANCELLED</th>
                            <th>FINE PER DAY</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {request.map((req) => (
                            <tr key={req._id}>
                                <td>{req.bookId.name}</td>
                                <td>
                                    {convertDateToString(
                                        new Date(req.bookedAt)
                                    )}
                                </td>
                                <td className="lms-text-center">
                                    {req.isBorrowed ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td className="lms-text-center">
                                    {req.isReturned ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td className="lms-text-center">
                                    {req.isCancelled ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td className="lms-text-center">
                                    ₹{req.bookId.finePerDay}
                                </td>
                                <td>
                                    <a
                                        href={`/request/${req._id}`}
                                        className="lms-btn btn-sm btn-dark"
                                    >
                                        Details
                                    </a>
                                    <a
                                        href={`/admin/request/${request._id}/edit`}
                                        className="me-2 ms-2"
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                            style={{
                                                backgroundColor: "#343a40",
                                                color: "white",
                                            }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default RequestListScreen;
