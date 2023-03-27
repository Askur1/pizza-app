import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem, CartState } from "../../shared/types";
import { getLocalCartItem } from "../../utils/get-local-item";
import { calcTotalPrice } from "../../utils/calc-total-price";

const { items, totalPrice } = getLocalCartItem("cart");

const initialState: CartState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );

      if (item) {
        item.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
      );
      if (item) item.count--;

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.type === action.payload.type
          )
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cartReducer;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
