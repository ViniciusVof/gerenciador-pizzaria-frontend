import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Loading } from "@/components/ui/Loading";

type LoadingContextData = {
  isLoadingPage: boolean;
  setLoadingPage: Dispatch<SetStateAction<boolean>>;
};

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingContext = createContext({} as LoadingContextData);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoadingPage, setLoadingPage] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoadingPage, setLoadingPage }}>
      {isLoadingPage ? <Loading /> : children}
    </LoadingContext.Provider>
  );
}
