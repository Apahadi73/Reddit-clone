import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import HomePage from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import LoginScreen from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import CreatePost from "./components/UIShared/CreatePost";
import { useSelector } from "react-redux";
function App() {
  // TODO: work oncreate button
  const [isEditModeOn, setEditMode] = useState(false);

  // opens post modal
  const createPost = () => {
    setEditMode(!isEditModeOn);
  };

  const closePostBox = () => {
    setEditMode(false);
  };

  // these are in place to make post box disappear when the user logs out
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <Router>
      <Header createPost={createPost} />
      <main className="py-4">
        <Container>
          {isEditModeOn && userInfo && (
            <CreatePost closePostBox={closePostBox} />
          )}
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route path="/page/:pageNumber" component={HomePage} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
            exact
          />
          <Route path="/" component={HomePage} exact />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/products/:id" exact component={ProductPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
