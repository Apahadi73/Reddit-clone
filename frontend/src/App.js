import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import HomePage from "./pages/HomePage";
import { PostDetailPage } from "./pages/PostDetailPage";
import LoginScreen from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewPostPage from "./pages/NewPostPage";
import Switch from "react-bootstrap/esm/Switch";

function App() {
  return (
    <Router>
      <Header />
      <Container className="pl-0">
        <main>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/posts/:id" exact component={PostDetailPage} />
            <Route path="/newpost" component={NewPostPage} exact />
          </Switch>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
