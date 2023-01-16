import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bookListReducer, bookDetailsReducer, bookDeleteReducer, bookCreateReducer, bookUpdateReducer, bookReviewCreateReducer, bookTopRatedReducer } from "./reducers/BookReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/UserReducers";

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    bookDelete: bookDeleteReducer,
    bookCreate: bookCreateReducer,
    bookUpdate: bookUpdateReducer,
    bookReviewCreate: bookReviewCreateReducer,
    bookTopRated: bookTopRatedReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

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
