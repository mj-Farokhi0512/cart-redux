import Products from "./Components/product/Products";
import Cart from "./Components/cart/Cart";
import React from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import { Nav, Navbar, Container, Col } from "react-bootstrap";

function App(props) {
  const emptyCart = React.useRef();
  const [empty, setEmpty] = React.useState(false);
  let timeout = null;
  function onCartEmpty() {
    setEmpty(true);
    timeout = setTimeout(() => {
      try {
        emptyCart.current.classList.add("fade-out-down");
        setTimeout(() => {
          setEmpty(false);
        }, 300);
      } catch (e) {
        console.log(e);
      }
    }, 5000);
  }

  return (
    <div className="App">
      <Router>
        <Navbar bg="light" variant="light" className="shadow-sm ">
          <Container>
            <Navbar.Brand href="#home" className="mx-2 fs-3">
              Navbar
            </Navbar.Brand>
            <Nav.Item className="ms-auto">
              <Link
                className="mx-4 ms-5 fs-5 text-dark text-decoration-none"
                to="/Products"
              >
                Products
              </Link>
            </Nav.Item>
            {props.items.length ? (
              <Nav.Item>
                <Link
                  to="/Cart"
                  style={{ position: "relative" }}
                  onClick={() => {
                    setEmpty(false);
                  }}
                >
                  <img
                    src="Images/shopping-bag.png"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "-18px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "2px 7px",
                      fontSize: "12px",
                      borderRadius: "50%",
                    }}
                  >
                    {props.items.length}
                  </span>
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <a
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={onCartEmpty}
                >
                  <img
                    src="Images/shopping-bag.png"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "-18px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "2px 7px",
                      fontSize: "12px",
                      borderRadius: "50%",
                    }}
                  >
                    {props.items.length}
                  </span>
                  {empty && (
                    <span
                      className="empty-cart fade-in-top rounded"
                      ref={emptyCart}
                    >
                      Your Cart is Empty!
                    </span>
                  )}
                </a>
              </Nav.Item>
            )}
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(App);
