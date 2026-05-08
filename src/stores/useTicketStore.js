import { create } from "zustand";

export const useTicketStore = create((set) => ({
    tickets: [],
    addTickets: (newTickets) =>
        set((state) => ({ tickets: [...state.tickets, ...newTickets] })),
}));
