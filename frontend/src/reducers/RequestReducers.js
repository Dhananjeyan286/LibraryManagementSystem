import {
    REQUEST_CREATE_FAIL,
    REQUEST_CREATE_SUCCESS,
    REQUEST_CREATE_REQUEST,
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
    INDIVIDUAL_REQUEST_CREATE_SUCCESS
} from "../constants/RequestConstants";

export const requestCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_CREATE_REQUEST:
            return { loading: true };
        case REQUEST_CREATE_SUCCESS:
            return { loading: false, success: true, request: action.payload.message };
        case REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const isBookedReducer = (state = {}, action) => {
    switch (action.type) {
        case IS_BOOKED_CREATE_REQUEST:
            return { loading: true };
        case IS_BOOKED_CREATE_SUCCESS:
            return { loading: false, success: true, request: action.payload.isBooked };
        case IS_BOOKED_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const canCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case CAN_CANCEL_CREATE_REQUEST:
            return { loading: true };
        case CAN_CANCEL_CREATE_SUCCESS:
            return { loading: false, success: true, request: action.payload.canCancel };
        case CAN_CANCEL_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const cancelReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_CREATE_REQUEST:
            return { loading: true };
        case CANCEL_CREATE_SUCCESS:
            return { loading: false, success: true, request: action.payload.message };
        case CANCEL_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchAllRequestReducer = (state = {request: []}, action) => {
    switch (action.type) {
        case ALL_REQUEST_CREATE_REQUEST:
            return { loading: true };
        case ALL_REQUEST_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                request: action.payload,
            };
        case ALL_REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchUserRequestReducer = (state = {request: []}, action) => {
    switch (action.type) {
        case USER_REQUEST_CREATE_REQUEST:
            return { loading: true };
        case USER_REQUEST_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                request: action.payload,
            };
        case USER_REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchIndividualRequestReducer = (state = {request: {}}, action) => {
    switch (action.type) {
        case INDIVIDUAL_REQUEST_CREATE_REQUEST:
            return { loading: true };
        case INDIVIDUAL_REQUEST_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                request: action.payload,
            };
        case INDIVIDUAL_REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
