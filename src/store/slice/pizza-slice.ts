import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { productsURL } from "../../pages/home/home";
import axios from "axios";
import { RootState } from "../store";
import { PizzaItem, PizzaState, RequestParams } from "../../shared/types";
import { Status } from "../../shared/types";

export const getPizzas = createAsyncThunk<
  PizzaItem[],
  RequestParams,
  { rejectValue: string }
>(
  "pizza/getPizzas",
  async (
    { order, sortBy, category, search, currentPage }: RequestParams,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `${productsURL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
  error: null,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(
      getPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.status = Status.RESOLVED;
        state.items = action.payload;
      }
    );

    builder.addCase(getPizzas.rejected, (state, action: AnyAction) => {
      state.status = Status.REJECTED;
      state.error = action.payload;
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizzaReducer;

export default pizzaSlice.reducer;
