import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (event, qty = 1) => {
        set((state) => {
            const eventInCart = state.cart.find((e) => e.id === event.id);
            if (eventInCart) {
                return {
                    cart: state.cart.map((e) => {
                        if (e.id === event.id) {
                            return { ...e, qty: e.qty + qty };
                        } else return e;
                    }),
                };
            } else {
                return {
                    cart: [...state.cart, { ...event, qty: qty }],
                };
            }
        });
    },
    removeFromCart: (id) => {
        set((state) => {
            const eventInCart = state.cart.find((e) => e.id === id);
            if (eventInCart.qty === 1) {
                return {
                    cart: state.cart.filter((e) => e.id !== id),
                };
            } else {
                return {
                    cart: state.cart.map((e) => {
                        if (e.id === id) {
                            return { ...e, qty: e.qty - 1 };
                        } else return e;
                    }),
                };
            }
        });
    },
    deleteFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((e) => e.id !== id),
        })),
    clearCart: () => set({ cart: [] }),
}));
