export const metadata = {
  title: "Gerenciador - Login",
};

import Image from "next/image";
import logoImg from "../../public/logo.svg";
import styles from "@/styles/home.module.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Gerenciador" />
      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu e-mail" type="text" />
          <Input placeholder="Digite sua senha" type="password" />
          <Button type="submit" loading={false}>
            Acessar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
}
