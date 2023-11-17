"use client";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";

export default function Category() {
  const [name, setName] = useState("");

  function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      toast.error("Preencha o nome da categoria");
      return;
    }
    api
      .post("/category", { name })
      .then(() => toast.success("Cadastrado com sucesso"))
      .catch(() => toast.error("Erro ao cadastrar categoria"))
      .finally(() => {
        setName("");
      });
  }
  return (
    <>
      <title>Nova categoria - Gerenciador</title>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
