import {
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  INSERT_TO_CART,
  REMOVE_ITEM,
  DISCOUNT_CODE,
  DONT_DISCOUNT,
  DISCOUNT,
  LIKE,
  DISLIKE,
  CHANGE_PAGE,
} from "./types";

export function insertToCart(item) {
  return {
    type: INSERT_TO_CART,
    payload: {
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
    },
  };
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: {
      id,
    },
  };
}

export function incrementItem(id) {
  return {
    type: INCREMENT_ITEM,
    payload: {
      id,
    },
  };
}

export function decrementItem(id) {
  return {
    type: DECREMENT_ITEM,
    payload: {
      id,
    },
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
    payload: {},
  };
}

export function discountCode(totalPrice) {
  return {
    type: DISCOUNT_CODE,
    payload: {
      totalPrice,
    },
  };
}

export function dontDiscount() {
  return {
    type: DONT_DISCOUNT,
    payload: {},
  };
}

export function discount() {
  return {
    type: DISCOUNT,
    payload: {},
  };
}

export function like(id) {
  return {
    type: LIKE,
    payload: {
      id,
    },
  };
}

export function dislike(id) {
  return {
    type: DISLIKE,
    payload: {
      id,
    },
  };
}

export function changePage(currentPage) {
  return {
    type: CHANGE_PAGE,
    payload: {
      currentPage,
    },
  };
}
