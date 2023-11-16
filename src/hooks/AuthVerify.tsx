import { parseCookies } from "nookies";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthVerify({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const cookies = parseCookies(undefined);
  const token = cookies["@nextauth.token"];
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && !token) return router.push("/");
    if (pathname === "/" && token) return router.push("/dashboard");

    setLoading(false);
  }, [pathname, token, router]);

  return !isLoading && children;
}
