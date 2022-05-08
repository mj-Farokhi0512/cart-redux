import { connect } from "react-redux";
import { Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  decrementItem,
  incrementItem,
  removeItem,
  discount,
} from "../../redux/cart/actions";
import { useRef } from "react";

function CartItem(props) {
  const animRef = useRef();

  function onRemoveItem() {
    if (props.items.length === 1) {
      props.cartOut.current.classList.add("fade-out-left");
      setTimeout(() => {
        props.removeItem(props.item.id);
        props.discount();
        animRef.current.classList.remove("fade-out-left");
      }, 320);
    } else {
      animRef.current.classList.remove("fade-in-right");
      animRef.current.classList.add("fade-out-left");
      // console.log(animRef.current.className);
      setTimeout(() => {
        props.removeItem(props.item.id);
        props.discount();
        animRef.current.classList.remove("fade-out-left");
      }, 320);
      // props.removeItem(props.item.id);
    }
  }

  function onIncrementItem() {
    props.incrementItem(props.item.id);
    props.discount();
  }

  function onDecrementItem() {
    if (props.item.num > 1) {
      props.decrementItem(props.item.id);
      props.discount();
    } else {
      onRemoveItem();
      props.discount();
    }
  }

  return (
    <Row>
      <Col>
        <div
          ref={animRef}
          className="cart-item py-3 my-2 bg-white shadow rounded-2 fs-5 d-flex justify-content-between align-items-center fade-in-right"
        >
          <img
            src={props.item.image}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            className="ms-4"
          />
          <span className="ms-4 my-2">{props.item.name}</span>{" "}
          <span className="ms-4 my-2">
            $ {props.item.price * props.item.num}
          </span>{" "}
          <span className="ms-4 my-2">Quantity ({props.item.num})</span>
          <div className="buttons">
            <Button variant="info" className="m-2" onClick={onDecrementItem}>
              -
            </Button>
            <Button variant="info" className="m-2" onClick={onIncrementItem}>
              +
            </Button>
            <Button variant="danger" className="m-2" onClick={onRemoveItem}>
              Remove Item
            </Button>
          </div>
        </div>
      </Col>
    </Row>
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
    removeItem: (id) => dispatch(removeItem(id)),
    incrementItem: (id) => dispatch(incrementItem(id)),
    decrementItem: (id) => dispatch(decrementItem(id)),
    discount: () => dispatch(discount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
