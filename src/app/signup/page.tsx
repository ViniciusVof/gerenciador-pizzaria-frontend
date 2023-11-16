export const metadata = {
  title: "Gerenciador - Cadastro",
};

import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import styles from "@/styles/home.module.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Gerenciador" />
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form>
          <Input placeholder="Digite seu nome" type="text" />
          <Input placeholder="Digite seu e-mail" type="text" />
          <Input placeholder="Digite sua senha" type="password" />
          <Button type="submit" loading={false}>
            Cadastrar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Já possui uma conta? Faça o login
        </Link>
      </div>
    </div>
  );
}
