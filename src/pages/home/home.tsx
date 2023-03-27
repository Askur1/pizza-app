import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { getPizzas, pizzaSelector } from "../../store/slice/pizza-slice";
import {
  setCategoryId,
  setSort,
  setCurrentPage,
  filterSelector,
} from "../../store/slice/filter-slice";
import {
  Categories,
  PizzaCard,
  Skeleton,
  Pagination,
  sortList,
  Sort,
} from "../../components/index";
import styles from './home.module.scss'

const initialProducts = [...new Array(6)];
export const productsURL = "https://63bde276f5cfc0949b4de042.mockapi.io/items";

const Home = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);
  const sortType = sort.sortProperty;
  const { items, status, error } = useSelector(pizzaSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const pizzas = items.map((item) => <PizzaCard key={item.id} {...item} />);
  const skeletons = initialProducts.map((_, index) => <Skeleton key={index} />);

  const requestPizzas = () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(getPizzas({ order, sortBy, category, search, currentPage }));
  };

  useEffect(() => {
    if (window.location.search) {
      const sort = sortList.find(
        (item) => item.sortProperty === searchParams.get("sortType")
      );
      dispatch(setCategoryId(Number(searchParams.get("categoryId"))));
      if (sort) dispatch(setSort(sort));
      dispatch(setCurrentPage(Number(searchParams.get("currentPage"))));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        sortType: sortType,
        categoryId: String(categoryId),
        currentPage: String(currentPage),
      });
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    requestPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className={styles.top}>
        <Categories categoryId={categoryId} />
        <Sort sort={sort} />
      </div>
      <div className="container">
        <h2 className={styles.title}>Все пиццы</h2>
        {error ? (
          <div className={styles.errorInfo}>
            <h2 className={styles.errorTitle}>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className={styles.items}>
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
        <Pagination currentPage={currentPage} />
      </div>
    </>
  );
};

export { Home };
