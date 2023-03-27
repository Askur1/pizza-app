import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { productsURL } from "../home/home";
import { PizzaPerPage } from "../../shared/types";
import styles from "./pizza.module.scss";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaPerPage>();

  const navigate = useNavigate();

  useEffect(() => {
    async function getPizza(url: string, id: string) {
      try {
        const { data } = await axios.get(`${url}/${id}`);
        setPizza(data);
        return data;
      } catch (error) {
        console.log("ERROR");
        navigate("/");
      }
    }
    if (id) {
      getPizza(productsURL, id);
    }
  }, []);

  if (!pizza) {
    return <div className={styles.loading}>Загрузка ...</div>;
  }

  return (
    <div className="container">
      <div className={styles.container}>
        <img src={pizza.imageUrl} alt={pizza.title} />
        <div className={styles.content}>
          <h2 className={styles.title}>{pizza.title}</h2>
          <p className={styles.price}>от {pizza.price} р</p>
          <Link to="/" className={styles.buttonBack}>
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
