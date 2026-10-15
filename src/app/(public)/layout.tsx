import type { ReactNode } from "react";
import { CartProvider } from "@/modules/cart/context";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
