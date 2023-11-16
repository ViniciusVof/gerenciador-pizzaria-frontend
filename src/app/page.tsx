"use client";

import Image from "next/image";
import logoImg from "../../public/logo.svg";
import styles from "@/styles/home.module.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email,
      password,
    };
    await signIn(data);
  }
  return (
    <>
      <title>Gerenciador - Login</title>
      <main className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Gerenciador" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </main>
    </>
  );
}
