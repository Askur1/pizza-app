import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filter-slice";
import cartReducer from "./slice/carts-slice";
import pizzaReducer from "./slice/pizza-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
