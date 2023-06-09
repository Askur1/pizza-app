import { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../store/slice/filter-slice";
import styles from "./search.module.scss";

const initialValue = "";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    dispatch(setSearchValue(initialValue));
    setValue(initialValue);
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 300),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <form className={styles.search}>
      <button className={styles.button} type="submit">
        <svg
          className={styles.iconSearch}
          enableBackground="new 0 0 32 32"
          id="Glyph"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
            id="XMLID_223_"
          />
        </svg>
      </button>
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
        ref={inputRef}
      />
      {value && (
        <button className={styles.button} onClick={clearInput}>
          <svg
            className={styles.iconClear}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      )}
    </form>
  );
};

export { Search };
