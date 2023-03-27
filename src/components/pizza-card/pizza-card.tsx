import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../../shared/types";
import { addItem, cartSelector } from "../../store/slice/carts-slice";
import styles from "./pizza-card.module.scss";

const pizzaType = ["тонкое", "традиционное"];

const defaultType = 0;
const defaultSize = 26;

interface PizzaCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

const PizzaCard = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: PizzaCardProps) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const addedItems = items.filter((item) => item.id === id);
  const totalCount = addedItems.reduce(
    (sum, current) => sum + current.count,
    0
  );

  const [activeType, setActiveType] = useState(defaultType);
  const [activeSize, setActiveSize] = useState(defaultSize);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaType[activeType],
      size: activeSize,
      count: 1,
    };
    dispatch(addItem(item));
  };
  return (
    <div className={styles.pizzaBlock}>
      <Link to={`/pizza/${id}`}>
        <img className={styles.image} src={imageUrl} alt="Pizza" />
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <div className={styles.selector}>
        <ul>
          {types.map((item) => (
            <li
              key={item}
              onClick={() => setActiveType(item)}
              className={activeType === item ? styles.active : ""}
            >
              {pizzaType[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              key={size}
              onClick={() => setActiveSize(size)}
              className={activeSize === size ? styles.active : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {totalCount > 0 && <i>{totalCount}</i>}
        </button>
      </div>
    </div>
  );
};

export { PizzaCard };
export type { PizzaCardProps };
