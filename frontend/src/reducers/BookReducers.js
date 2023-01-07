import {
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL
} from "../constants/BookConstants";

export const bookListReducer = (state = { Books: [] }, action) => {
    switch (action.type) {
        case BOOK_LIST_REQUEST:
            return { loading: true, Books: [] };
        case BOOK_LIST_SUCCESS:
            return { loading: false, Books: action.payload };
        case BOOK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookDetailsReducer = (
    state = { book: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case BOOK_DETAILS_REQUEST:
            return { loading: true, ...state };
        case BOOK_DETAILS_SUCCESS:
            return { loading: false, book: action.payload };
        case BOOK_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
