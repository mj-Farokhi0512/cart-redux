import React from "react";
import "../Styles/Discount.css";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {
  discountCode,
  dontDiscount,
  discount,
  discountVisible,
  discountNotVisible,
} from "../../redux/cart/actions";

const btnRef = React.createRef();
const inputRef = React.createRef();
const discountRef = React.createRef();

class DiscountCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountVisible: false,
      floatVisible: false,
      discount: {},
    };
  }

  componentWillUpdate() {
    if (!this.props.discountFlag) {
      this.setState({
        discountVisible: false,
        alertVisible: false,
      });
    }
  }

  onDiscountClick = () => {
    btnRef.current.classList.add("fade-out-left");

    setTimeout(() => {
      this.setState({
        discountVisible: true,
        floatVisible: true,
        discount: this.props.discounts[Math.floor(Math.random() * 5)],
      });
    }, 300);
  };

  onClosePage = () => {
    setTimeout(
      () => this.setState({ floatVisible: !this.state.floatVisible }),
      400
    );
  };

  onClickDiscount = () => {
    const input = inputRef.current;
    if (this.props.discountFlag && this.state.discount.code === input.value) {
      this.props.discountCode(
        this.props.totalPrice -
          this.props.totalPrice * (this.state.discount.percent / 100)
      );
      this.props.dontDiscount();
      this.setState({
        alertVisible: true,
      });
    }
  };

  onChangeInput = () => {
    const input = inputRef.current;

    if (input.value !== "" && this.state.discount.code !== input.value) {
      input.className = "form-control my-3";
      input.classList.add("bs-danger");
    } else if (this.state.discount.code === input.value) {
      input.className = "form-control my-3";
      input.classList.add("bs-success");
    } else if (input.value === "") {
      input.className = "form-control my-3";
    }
  };

  onEnterDiscount = (event) => {
    if (event.key === "Enter") {
      this.onClickDiscount();
    }
  };

  render() {
    return (
      <div className="">
        {!this.state.discountVisible && !this.state.alertVisible && (
          <button
            ref={btnRef}
            className="btn btn-info btn-lg my-3 fade-in-left"
            onClick={this.onDiscountClick}
          >
            Discount Generator
          </button>
        )}
        {this.state.discountVisible && this.props.discountFlag && (
          <div className="fade-in-right" ref={discountRef}>
            <Row>
              <Col>
                <input
                  ref={inputRef}
                  type="input"
                  onKeyDown={this.onEnterDiscount}
                  onChange={this.onChangeInput}
                  className="form-control my-3"
                />
              </Col>
            </Row>
          </div>
        )}
        {this.state.discountVisible && !this.props.discountFlag && (
          <Row>
            <Col xs={3}>
              <div className="fs-3 text-white fade-in-right bg-success px-3 rounded-3">
                ✓
              </div>
            </Col>
          </Row>
        )}
        {this.state.floatVisible && (
          <FloatPage
            closePage={this.onClosePage}
            discount={this.state.discount}
          />
        )}
      </div>
    );
  }
}

function FloatPage({ discount, closePage }) {
  const animFloat = React.useRef();
  const textCopy = React.useRef();

  const timeout = setTimeout(() => {
    animFloat.current.classList.add("fade-out-down");
    closePage();
  }, 10000);

  function onClosePage() {
    animFloat.current.classList.add("fade-out-down");
    clearTimeout(timeout);
    closePage();
  }

  function onCopy() {
    navigator.clipboard.writeText(discount.code);
    animFloat.current.classList.add("fade-out-down");
    clearTimeout(timeout);
    closePage();
  }

  return (
    <div
      ref={animFloat}
      className="position-fixed bg-dark bg-opacity-25 bg-float fade-in-top"
    >
      <div className="float-page">
        <h3 ref={textCopy}>{discount.code}</h3>
        <button
          className="btn bg-dark text-white position-absolute top-0 end-0"
          onClick={onClosePage}
        >
          ☓
        </button>
        <button onClick={onCopy} className="btn btn-secondary btn-copy">
          Copy
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    totalPrice: state.totalPrice,
    discounts: state.discounts,
    discountFlag: state.discountFlag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    discountCode: (totalPrice) => dispatch(discountCode(totalPrice)),
    discount: () => dispatch(discount()),
    dontDiscount: () => dispatch(dontDiscount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCode);
