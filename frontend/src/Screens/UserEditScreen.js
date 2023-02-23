
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { useState, useEffect } from "react"
import { getUserDetails, updateUser } from "../actions/UserActions";
import { USER_UPDATE_RESET } from "../constants/UserConstants";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [isVerified, setIsVerified] = useState(false);
    const [rfid, setRfid] = useState("")
    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            // history.push("/admin/userlist");
            setSuccessMessage("User details updated successfully")
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsVerified(user.isVerified)
            setRfid(user.rfid)
            setPhone(user.phone);
            setDepartment(user.department);
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
                setPhone(user.phone);
                setDepartment(user.department);
                setIsVerified(user.isVerified)
                setRfid(user.rfid)
            }
        }
    }, [dispatch, userId, user, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (
            !name || !email || !phone || !department) {
            setMessage("Enter all fields");
            return;
        }
        if((!rfid && isVerified) || (rfid && !isVerified)) {
            setMessage("Either enter the RFID tag number and make the user as verified or make the user as not verified if the RFID tag number is not available")
            return
        }
        var expr = /^(0|91)?[6-9][0-9]{9}$/;
        if (!expr.test(phone)) {
            setMessage("Enter a valid mobile number");
            return;
        }
        dispatch(updateUser({ _id: userId, name, email, isAdmin, phone, department, isVerified, rfid }));
    };

    return (
        <>
            <a href="/admin/userlist" className="btn btn-dark my-3">
                Go Back
            </a>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {message && <Message variant="danger">{message}</Message>}
                {successMessage && (
                    <Message variant="success">{successMessage}</Message>
                )}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Row>
                            <Form.Group controlId="department">
                                <Form.Label>Department</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="checkbox1">
                                <Form.Check
                                    type="radio"
                                    id="LMS-book-edit-checkbox-CSE"
                                    label="CSE"
                                    name="isDepartmentChecked"
                                    checked={
                                        department === "CSE" ? true : false
                                    }
                                    defaultChecked="true"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDepartment("CSE");
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
                                    id="LMS-book-edit-checkbox-IT"
                                    label="IT"
                                    name="isDepartmentChecked"
                                    checked={department === "IT" ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDepartment("IT");
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
                                    id="LMS-book-edit-checkbox-EEE"
                                    label="EEE"
                                    name="isDepartmentChecked"
                                    checked={
                                        department === "EEE" ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDepartment("EEE");
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
                                    id="LMS-book-edit-checkbox-ECE"
                                    label="ECE"
                                    name="isDepartmentChecked"
                                    checked={
                                        department === "ECE" ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDepartment("ECE");
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
                                    id="LMS-book-edit-checkbox-Mech"
                                    label="Mech"
                                    name="isDepartmentChecked"
                                    checked={
                                        department === "Mech" ? true : false
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDepartment("Mech");
                                        }
                                    }}
                                    className="form-checkbox"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                className="ues"
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Form.Group controlId="isVerified">
                            <Form.Check
                                type="checkbox"
                                label="Is Verified User"
                                checked={isVerified}
                                className="ues"
                                onChange={(e) =>
                                    setIsVerified(e.target.checked)
                                }
                            ></Form.Check>
                        </Form.Group>

                        <Form.Group controlId="rfid">
                            <Form.Label>Enter RFID tag number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tag number"
                                value={rfid}
                                onChange={(e) => setRfid(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-3"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;