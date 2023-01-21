import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen"
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookScreen from "./Screens/BookScreen"
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import BookListScreen from "./Screens/BookListScreen";
import BookEditScreen from "./Screens/BookEditScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/book/:id" component={BookScreen} />
                    <Route path="/admin/userlist" component={UserListScreen} />
                    <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
                    <Route path="/admin/booklist" component={BookListScreen} exact/>
                    <Route path="/admin/booklist/:pageNumber" component={BookListScreen} exact/>
                    <Route path="/admin/book/:id/edit" component={BookEditScreen}/>
                    <Route path="/name/:name/author/:author/genre/:genre/ageCategory/:ageCategory/publicationName/:publicationName/ratings/:ratings/noOfReviews/:noOfReviews" component={HomeScreen} exact/>
                    <Route path='/page/:pageNumber' component={HomeScreen} exact />
                    <Route path="/page/:pageNumber/name/:name/author/:author/genre/:genre/ageCategory/:ageCategory/publicationName/:publicationName/ratings/:ratings/noOfReviews/:noOfReviews" component={HomeScreen} exact />
                    <Route path="/" component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
