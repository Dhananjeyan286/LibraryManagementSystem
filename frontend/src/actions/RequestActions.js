import axios from "axios";
import {
    REQUEST_CREATE_FAIL,
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_SUCCESS,
    IS_BOOKED_CREATE_FAIL,
    IS_BOOKED_CREATE_REQUEST,
    IS_BOOKED_CREATE_SUCCESS,
    CAN_CANCEL_CREATE_FAIL,
    CAN_CANCEL_CREATE_REQUEST,
    CAN_CANCEL_CREATE_SUCCESS,
    CANCEL_CREATE_FAIL,
    CANCEL_CREATE_REQUEST,
    CANCEL_CREATE_SUCCESS,
    ALL_REQUEST_CREATE_FAIL,
    ALL_REQUEST_CREATE_REQUEST,
    ALL_REQUEST_CREATE_SUCCESS,
    USER_REQUEST_CREATE_FAIL,
    USER_REQUEST_CREATE_REQUEST,
    USER_REQUEST_CREATE_SUCCESS,
    INDIVIDUAL_REQUEST_CREATE_FAIL,
    INDIVIDUAL_REQUEST_CREATE_REQUEST,
    INDIVIDUAL_REQUEST_CREATE_SUCCESS,
} from "../constants/RequestConstants";

export const createRequest = (userId, bookId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/request/create`, {userId, bookId}, config);
        console.log(data)

        dispatch({
            type: REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REQUEST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const isBooked = (userId, bookId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: IS_BOOKED_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/booked`,
            { userId, bookId },
            config
        );

        dispatch({
            type: IS_BOOKED_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: IS_BOOKED_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const canCancel = (userId, bookId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAN_CANCEL_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/canCancel`,
            { userId, bookId },
            config
        );

        dispatch({
            type: CAN_CANCEL_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CAN_CANCEL_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const cancel = (userId, bookId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CANCEL_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/cancel`,
            { userId, bookId },
            config
        );

        dispatch({
            type: CANCEL_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CANCEL_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const allRequest = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_REQUEST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/admin/all`,
            {},
            config
        );

        dispatch({
            type: ALL_REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REQUEST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const userRequest = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REQUEST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/fetch`,
            { userId },
            config
        );

        dispatch({
            type: USER_REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REQUEST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const individualRequest = (userId, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INDIVIDUAL_REQUEST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/request/individual`,
            { userId, id },
            config
        );

        dispatch({
            type: INDIVIDUAL_REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INDIVIDUAL_REQUEST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};