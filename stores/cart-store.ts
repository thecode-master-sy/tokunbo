// src/stores/cart-store.ts
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

const initialState = {
  items: [],
};

export const createCartStore = () =>
  createStore<CartState>()(
    persist(
      (set, get) => ({
        ...initialState,

        addItem: (item) =>
          set((state) => {
            const existing = state.items.find((p) => p.id === item.id);

            if (existing) {
              return {
                items: state.items.map((p) =>
                  p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
                ),
              };
            }

            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }),

        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),

        increaseQty: (id) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })),

        decreaseQty: (id) =>
          set((state) => ({
            items: state.items
              .map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              )
              .filter((item) => item.quantity > 0),
          })),

        clearCart: () => set({ items: [] }),

        totalItems: () =>
          get().items.reduce((sum, item) => sum + item.quantity, 0),

        totalPrice: () =>
          get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
