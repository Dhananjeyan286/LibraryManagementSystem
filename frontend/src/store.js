import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bookListReducer, bookDetailsReducer } from "./reducers/BookReducers";

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { BookListReducer } from "./reducers/BookReducers";
// import thunk from "redux-thunk";

// const store = configureStore({
//     reducer: { BookList: BookListReducer },
//     preloadedState: {},
//     middleware: [thunk],
// });

// export default store;
