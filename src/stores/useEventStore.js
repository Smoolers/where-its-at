import { create } from "zustand";
import axios from "axios";

export const useEventStore = create((set) => ({
    events: [],
    loading: true,
    error: false,
    fetchEvents: () => {
        set({ loading: true });
        axios
            .get("https://santosnr6.github.io/Data/events.json")
            .then((response) => {
                set({ events: response.data.events, loading: false });
            })
            .catch(() => {
                set({
                    error: true,
                    loading: false,
                });
            });
    },
}));
