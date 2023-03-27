import { useDispatch } from "react-redux";
import { addItem, removeItem, minusItem } from "../../store/slice/carts-slice";
import { CartItem } from "../../shared/types";
import styles from "./cart-item-block.module.scss";

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
}

const CartItemBlock = ({
  id,
  title,
  price,
  imageUrl,
  size,
  type,
  count,
}: CartItemProps) => {
  const dispatch = useDispatch();
  const item: CartItem = {
    id,
    title,
    price,
    imageUrl,
    type,
    size,
    count,
  };

  const onClickAddItem = () => {
    dispatch(addItem(item));
  };

  const onClickRemoveItem = () => {
    if (window.confirm("Удалить товар?")) {
      dispatch(removeItem(item));
    }
  };
  const onClickMinusItem = () => {
    dispatch(minusItem(item));
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        <div className={styles.itemImg}>
          <img className={styles.image} src={imageUrl} alt="Pizza" />
        </div>
        <div className={styles.itemInfo}>
          <h3>{title}</h3>
          <p>
            {type}, {size} см.
          </p>
        </div>
      </div>
      <div className={styles.itemDescription}>
        <div className={styles.itemCount}>
          <button
            disabled={count === 1}
            className="button button--outline button--circle cart__item-count-minus"
            onClick={onClickMinusItem}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </button>
          <b>{count}</b>
          <button
            className="button button--outline button--circle cart__item-count-plus"
            onClick={onClickAddItem}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </button>
        </div>
        <div className={styles.itemPrice}>
          <b>{price * count} ₽</b>
        </div>
        <div className={styles.itemRemove}>
          <div
            className={`${styles.button} button button--outline button--circle`}
            onClick={onClickRemoveItem}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartItemBlock };
export type { CartItemProps };
