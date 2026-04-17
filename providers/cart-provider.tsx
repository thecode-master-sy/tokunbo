// src/providers/cart-provider.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCartStore } from "@/stores/cart-store";

type CartStore = ReturnType<typeof createCartStore>;

const CartContext = createContext<CartStore | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => createCartStore());

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCart<T>(
  selector: (state: ReturnType<CartStore["getState"]>) => T,
) {
  const store = useContext(CartContext);
  if (!store) throw new Error("useCart must be used inside CartProvider");
  return useStore(store, selector);
}
