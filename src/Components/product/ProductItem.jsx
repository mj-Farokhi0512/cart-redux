import { Col, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { dislike, insertToCart, like } from "../../redux/cart/actions";

function ProductItem(props) {
  function onAddToCart() {
    props.insertToCart(props.item);
    // console.log(props.items, props.totalPrice);
  }

  return (
    <Col xs={12} md={6} lg={4} className="my-1">
      <div className="product">
        <img src={props.item.image} className="image-item" />
        <h3 className="border-bottom pb-2 mb-0">{props.item.name}</h3>
        <Container>
          <Row>
            <Col className="d-flex justify-content-between">
              <span className="price pt-2">$ {props.item.price}</span>
              {props.item.likeFlag ? (
                <span style={{ userSelect: "none" }}>
                  <span
                    className="like-number pe-1"
                    style={{ verticalAlign: "3px" }}
                  >
                    {props.item.like}
                  </span>
                  <span
                    className="like-product fs-2 "
                    onClick={() => {
                      props.dislike(props.item.id);
                    }}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      transition: "0.4s",
                    }}
                  >
                    &#9829;
                  </span>
                </span>
              ) : (
                <span style={{ userSelect: "none" }}>
                  <span
                    className="like-number pe-1"
                    style={{ verticalAlign: "3px" }}
                  >
                    {props.item.like}
                  </span>
                  <span
                    className="like-product fs-2"
                    style={{ cursor: "pointer", transition: "0.4s" }}
                    onClick={() => {
                      props.like(props.item.id);
                    }}
                  >
                    &#9825;
                  </span>
                </span>
              )}
            </Col>
          </Row>
        </Container>
        <Button variant="success" className="m-2" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Col>
  );
}

function mapStateToProps(state) {
  return {
    items: state.items,
    totalPrice: state.totalPrice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    insertToCart: (item) => dispatch(insertToCart(item)),
    like: (id) => dispatch(like(id)),
    dislike: (id) => dispatch(dislike(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
