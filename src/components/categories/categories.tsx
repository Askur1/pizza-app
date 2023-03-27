import { memo } from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../store/slice/filter-slice";
import styles from "./categories.module.scss";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

interface CategoriesProps {
  categoryId: number;
}

const Categories = memo(({ categoryId }: CategoriesProps) => {
  const dispatch = useDispatch();

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <ul className={styles.categories}>
      {categories.map((item, index) => (
        <li
          key={index}
          onClick={() => onChangeCategory(index)}
          className={categoryId === index ? styles.active : ""}
        >
          {item}
        </li>
      ))}
    </ul>
  );
});

export { Categories };
export type { CategoriesProps };
