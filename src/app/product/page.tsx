"use client";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { LoadingContext } from "@/contexts/LoadingContext";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

type CategoriesRequestData = {
  id: string;
  name: string;
};

export default function Product() {
  const { setLoadingPage } = useContext(LoadingContext);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const image = e.target.files[0];
    if (!image) return;

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(e.target.value);
  }

  useEffect(() => {
    setLoadingPage(true);
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => toast.error("Erro ao listar categorias"))
      .finally(() => setLoadingPage(false));
  }, []);

  return (
    <>
      <title>Novo Produto - Gerenciador</title>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <select onChange={handleChangeCategory} value={categorySelected}>
              {categories.map(({ id, name }: CategoriesRequestData, index) => (
                <option key={id} value={index}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className={styles.input}
              placeholder="Digite o nome do produto"
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Preço do produto"
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto"
            ></textarea>

            <button className={styles.buttonAdd}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}
