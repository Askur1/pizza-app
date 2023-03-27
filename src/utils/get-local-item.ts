import { calcTotalPrice } from "./calc-total-price";

export const getLocalCartItem = (item: string) => {
  try {
    const storageItems = localStorage.getItem(item);
    const items = storageItems ? JSON.parse(storageItems) : [];
    const totalPrice = calcTotalPrice(items);

    return {
      items,
      totalPrice,
    };
  } catch (error) {
    console.log((error as Error).message);
    return {
      items: [],
      totalPrice: 0,
    };
  }
};
