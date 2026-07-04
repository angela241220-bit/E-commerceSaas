import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useCartStore = create()(persist((set, get) => ({
    items: [],
    addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === newItem.id);
        if (existingItem) {
            set({
                items: items.map((item) => item.id === newItem.id
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item),
            });
        }
        else {
            set({ items: [...items, newItem] });
        }
    },
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
    })),
    updateItemQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, quantity } : item),
    })),
    clearCart: () => set({ items: [] }),
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
}));
