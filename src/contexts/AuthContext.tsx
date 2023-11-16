"use client";
import { api } from "@/services/apiClient";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

type UserProps =
  | {
      id: string;
      name: string;
      email: string;
    }
  | undefined;

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //expirar em 1 mês);
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!");

      router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao acessar");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/user", {
        name,
        email,
        password,
      });

      router.push("/");
      toast.success("Cadastrado com sucesso!");
    } catch (err) {
      toast.error("Erro ao cadastrar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
