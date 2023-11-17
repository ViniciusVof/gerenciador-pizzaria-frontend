"use client";
import { FiRefreshCcw } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { setLoadingPage } = useContext(LoadingContext);
  const [orders, setOrders] = useState([]);

  function getOrders() {
    setLoadingPage(true);
    api
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => toast.error("Erro ao listar pedidos"))
      .finally(() => setLoadingPage(false));
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <title>Painel Gerenciador</title>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <FiRefreshCcw size={25} color="#3fffa3" />
          </button>
        </div>

        <article className={styles.listOrders}>
          {orders.map(({ id, table }) => (
            <section key={id} className={styles.orderItem}>
              <button>
                <div className={styles.tag}></div>
                <span>Mesa {table}</span>
              </button>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
