import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import CartItem from "./CartItem";
import { clearCart, discount } from "../../redux/cart/actions";
import DiscountCode from "../discount/DiscountCode";
import { Navigate, Routes, Route } from "react-router-dom";
import "../Styles/Discount.css";

const cartOut = React.createRef();

class Cart extends React.Component {
  onClearCart() {
    cartOut.current.classList.add("fade-out-left");
    setTimeout(() => this.props.clearCart(), 300);
  }

  render() {
    return (
      <div className="Cart mt-5">
        {this.props.items.length ? (
          <Container ref={cartOut}>
            <Row>
              <Col className="fs-3 fw-bold my-3">
                Cart ({this.props.items.length}) Total Items: (
                {this.props.items.length})
              </Col>
            </Row>
            <Row>
              <Col>
                {this.props.items.map((item, index) => (
                  <CartItem item={item} key={index} cartOut={cartOut} />
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs>
                <span className="total-price fs-4">
                  Total Price : $ {this.props.totalPrice}
                </span>
                <Button
                  variant="danger"
                  className="my-4 mx-3 fs-5"
                  onClick={this.onClearCart.bind(this)}
                >
                  Clear Cart
                </Button>
                <Button className="my-4 mx-2 fs-5">Buy now</Button>
              </Col>
              <Row>
                <Col xs={3}>
                  <DiscountCode />
                </Col>
              </Row>
            </Row>
          </Container>
        ) : (
          // <h1 className="text-center fade-in-right">Your Cart is Empty</h1>
          <Navigate to="/Products" />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    totalPrice: state.totalPrice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCart: () => dispatch(clearCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
