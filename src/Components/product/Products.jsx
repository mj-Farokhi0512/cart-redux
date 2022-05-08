import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Products.css";
import ProductItem from "./ProductItem";
import { changePage, nextPage, previousPage } from "../../redux/cart/actions";
import { connect } from "react-redux";
// import DiscountCode from "../discount/DiscountCode";

class Products extends React.Component {
  render() {
    return (
      <div className="products">
        <h1>All Items</h1>
        <Container>
          <Row>
            {this.props.product
              .filter(
                (item, index) =>
                  this.props.currentPage * 3 - 3 <= index &&
                  this.props.currentPage * 3 > index
              )
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </Row>
          <Row>
            <Paginator />
          </Row>
        </Container>
      </div>
    );
  }
}

const Paginator = connect(
  mapStateToProps,
  mapDispatchToProps
)(function Paginate(props) {
  const pageRef = React.useRef();

  function pageNumbers() {
    let num = 0;
    let element = null;
    let pageArray = [];

    if (props.product.length % 3 == 0) {
      num = props.product.length / 3;
    } else {
      num = props.product.length / 3 + 1;
    }

    for (let x = 1; x <= num; x++) {
      element = (
        <li
          className="px-3 py-1 fs-4 mx-2 bg-white rounded shadow-sm"
          value={x}
          onClick={(e) => {
            props.changePage(e.target.value);
            console.log(e.target.value);
          }}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {x}
        </li>
      );

      pageArray.push(element);
    }

    return pageArray;
  }

  React.useEffect(() => {
    Array.from(pageRef.current.children).forEach((item, index) => {
      if (item.value === props.currentPage) {
        item.classList.remove("bg-white");
        item.classList.add("bg-dark", "text-white");
      } else {
        item.classList.remove("bg-dark", "text-white");
        item.classList.add("bg-white");
      }
    });
  }, [props.currentPage]);

  return (
    <ul ref={pageRef} className="paginate d-flex my-5 justify-content-center">
      <li
        className="px-3 fs-4 py-1 mx-2 bg-white rounded shadow-sm same-width"
        onClick={() => (props.currentPage > 1 ? props.previousPage() : "")}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        &#10094; Previous
      </li>
      {pageNumbers().map((item, index) => item)}
      <li
        className="px-3 fs-4 py-1 mx-2 bg-white rounded shadow-sm same-width"
        onClick={() =>
          props.currentPage < pageNumbers().length ? props.nextPage() : ""
        }
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Next &#10095;
      </li>
    </ul>
  );
});

function mapStateToProps(state) {
  return {
    product: state.product,
    currentPage: state.currentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePage: (currentPage) => dispatch(changePage(currentPage)),
    nextPage: () => dispatch(nextPage()),
    previousPage: () => dispatch(previousPage()),
  };
}
// connect(mapStateToProps, mapDispatchToProps)(Paginate);
export default connect(mapStateToProps)(Products);
