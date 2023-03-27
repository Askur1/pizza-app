import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../../store/slice/filter-slice";
import { SortItem } from "../../shared/types";
import styles from "./sort.module.scss";

export const sortList: SortItem[] = [
  { name: "популярности (популярные)", sortProperty: "rating" },
  { name: "популярности (непопулярные)", sortProperty: "-rating" },
  { name: "цене (сначала дорогие)", sortProperty: "price" },
  { name: "цене (сначала дешевые)", sortProperty: "-price" },
  { name: "алфавиту (с конца)", sortProperty: "title" },
  { name: "алфавиту (с начала)", sortProperty: "-title" },
];

interface SortProps {
  sort: SortItem;
}

const Sort = memo(({ sort }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
      setIsOpen(false);
    }
  };

  const chooseSortItem = (item: SortItem) => {
    dispatch(setSort(item));
    setIsOpen(!isOpen);
  };
  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                onClick={() => chooseSortItem(item)}
                className={
                  sort.sortProperty === item.sortProperty ? styles.active : ""
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export { Sort };
export type { SortProps };
