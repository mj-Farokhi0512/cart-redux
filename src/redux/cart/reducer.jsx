import {
  INSERT_TO_CART,
  REMOVE_ITEM,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  DISCOUNT_CODE,
  DONT_DISCOUNT,
  DISCOUNT,
  LIKE,
  DISLIKE,
  CHANGE_PAGE,
} from "./types";

const initialState = {
  items: [],
  totalPrice: 0,
  product: [
    {
      id: 1,
      image: "Images/grape.png",
      name: "Grape",
      price: 46,
      like: 24,
      likeFlag: false,
    },
    {
      id: 2,
      image: "Images/mango.png",
      name: "Mango",
      price: 56,
      like: 26,
      likeFlag: false,
    },
    {
      id: 3,
      image: "Images/pineapple.png",
      name: "PineApple",
      price: 54,
      like: 16,
      likeFlag: false,
    },
    {
      id: 4,
      image: "Images/grape.png",
      name: "Grape",
      price: 46,
      like: 24,
      likeFlag: false,
    },
    {
      id: 5,
      image: "Images/mango.png",
      name: "Mango",
      price: 56,
      like: 26,
      likeFlag: false,
    },
    {
      id: 6,
      image: "Images/pineapple.png",
      name: "PineApple",
      price: 54,
      like: 16,
      likeFlag: false,
    },
  ],
  discounts: [
    {
      code: "discount1",
      percent: 10,
    },
    {
      code: "discount2",
      percent: 20,
    },
    {
      code: "discount3",
      percent: 30,
    },
    {
      code: "discount4",
      percent: 40,
    },
    {
      code: "discount5",
      percent: 50,
    },
  ],
  discountFlag: true,
  currentPage: 1,
  // displayPages: [],
};

let elements = null;
let priceItems = 0;

function reducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_TO_CART:
      const payload = action.payload;
      const item = {
        id: payload.id,
        image: payload.image,
        name: payload.name,
        price: payload.price,
        num: 1,
      };
      let flag = true;
      state.items.forEach((element) => {
        if (element.id === item.id) {
          flag = false;
        }
      });
      elements = [...state.items, flag ? item : ""].filter(
        (item) => item !== ""
      );
      priceItems = 0;
      Number(
        elements.forEach((item) => {
          priceItems += item.price * item.num;
        })
      );
      return {
        ...state,
        items: elements,
        totalPrice: priceItems,
      };
    case REMOVE_ITEM:
      elements = state.items.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
      });
      priceItems = 0;
      Number(
        elements.forEach((item) => {
          priceItems += item.price * item.num;
        })
      );
      return {
        ...state,
        items: elements,
        totalPrice: priceItems,
      };
    case INCREMENT_ITEM:
      elements = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, num: ++item.num };
        } else {
          return item;
        }
      });
      priceItems = 0;
      Number(
        elements.forEach((item) => {
          priceItems += item.price * item.num;
        })
      );
      return {
        ...state,
        items: elements,
        totalPrice: priceItems,
      };
    case DECREMENT_ITEM:
      elements = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, num: --item.num };
        } else {
          return item;
        }
      });
      priceItems = 0;
      Number(
        elements.forEach((item) => {
          priceItems += item.price * item.num;
        })
      );
      return {
        ...state,
        items: elements,
        totalPrice: priceItems,
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        totalPrice: 0,
      };
    case DISCOUNT_CODE:
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };
    case DONT_DISCOUNT:
      return {
        ...state,
        discountFlag: false,
      };
    case DISCOUNT:
      return {
        ...state,
        discountFlag: true,
      };
    case LIKE:
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              like: item.like + 1,
              likeFlag: true,
            };
          } else {
            return item;
          }
        }),
      };
    case DISLIKE:
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              like: item.like - 1,
              likeFlag: false,
            };
          } else {
            return item;
          }
        }),
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
}

export default reducer;
