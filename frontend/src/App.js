import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import HomePage from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import LoginScreen from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
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
