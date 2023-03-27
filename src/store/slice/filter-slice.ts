import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, SortItem } from "../../shared/types";
import { RootState } from "../store";

const defaultCategory = 0;
const startPage = 1;

const initialState: FilterState = {
  searchValue: "",
  categoryId: defaultCategory,
  sort: {
    name: "популярности (популярные)",
    sortProperty: "rating",
  },
  currentPage: startPage,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {

      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filterReducer;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
