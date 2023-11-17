"use client";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function Product() {
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
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
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
