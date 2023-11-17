import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Loading } from "@/components/ui/Loading";

type LoadingContextData = {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingContext = createContext({} as LoadingContextData);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading ? <Loading /> : children}
    </LoadingContext.Provider>
  );
}
