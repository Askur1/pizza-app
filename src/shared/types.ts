export interface SortItem {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
}

export interface PizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}

export interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: SortItem;
  currentPage: number;
}
export enum Status {
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export interface PizzaState {
  items: PizzaItem[];
  status: "loading" | "resolved" | "rejected";
  error: null | string;
}

export interface RequestParams {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
}

export interface PizzaPerPage {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
