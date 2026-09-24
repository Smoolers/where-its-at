import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Global import av Toaster-komponent ↑
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventPage from "./pages/EventPage/EventPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useEventStore } from "./stores/useEventStore";
import spinnerIcon from "./assets/spinner.svg";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "events",
                element: <EventsPage />,
            },
            {
                path: "event/:id",
                element: <EventPage />,
            },
            {
                path: "order",
                element: <OrderPage />,
            },
            {
                path: "tickets",
                element: <TicketsPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
], {
    basename: import.meta.env.BASE_URL,
});

function App() {
    const fetchEvents = useEventStore((state) => state.fetchEvents);
    const loading = useEventStore((state) => state.loading);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div className="app">
            {/* Toaster-komponenten ger förutsättningar för ett pop-up-fönster, vid t ex knapp-klick ↓ */}
            {/*Genom global import och placering utanför RouterProvider så "finns" den alltid i appen (dvs behöver då inte mountas/unmountas vid navigation) ↓ */}
            <Toaster
                // Pop-up-placering längst ner på skärmen ↓
                position="bottom-center"
                // Justerar upp avståndet från botten med 134 pixlar ↓
                containerStyle={{ bottom: 134 }}
            />
            {loading ? (
                <div className="loading-container">
                    <img
                        src={spinnerIcon}
                        alt="Loading.."
                        className="loading-spinner"
                    />
                </div>
            ) : (
                <RouterProvider router={router} />
            )}
        </div>
    );
}

export default App;
