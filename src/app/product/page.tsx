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
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<CategoriesRequestData[]>([]);
  const [categorySelected, setCategorySelected] = useState(0);
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
    setCategorySelected(Number(e.target.value));
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

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();

    if (!name || !price || !description || !imageAvatar) {
      toast.error("Preencha todos os campos");
      return;
    }

    data.append("name", name);
    data.append("price", price);
    data.append("description", name);
    data.append("category_id", categories[categorySelected].id);
    data.append("file", imageAvatar);

    api
      .post("/product", data)
      .then(() => {
        toast.success("Produto cadastrado com sucesso");
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar produto");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setName("");
        setPrice("");
        setDescription("");
        setCategorySelected(0);
        setImageAvatar(null);
        setAvatarUrl("");
      });
  }

  return (
    <>
      <title>Novo Produto - Gerenciador</title>
      <div>
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form} onSubmit={handleRegister}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className={styles.buttonAdd}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}
