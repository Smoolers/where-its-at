import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Import av toast-pop-up (kan användas tack vare global import av Toaster-komponent) ↑
import Header from "../../components/Header/Header";
import EventDetails from "../../components/EventDetails/EventDetails";
import Footer from "../../components/Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useEventStore } from "../../stores/useEventStore";
import { useCartStore } from "../../stores/useCartStore";
import "./eventPage.css";

const EventPage = () => {
    const navigate = useNavigate();
    // Nyckeln som destructas i useParams() matchar parameternamnet i routen (event/:id) ↓
    const { id } = useParams();
    const events = useEventStore((state) => state.events);
    const error = useEventStore((state) => state.error);
    const addToCart = useCartStore((state) => state.addToCart);
    const cartTotal = useCartStore((state) =>
        state.cart.reduce((acc, event) => acc + event.qty, 0),
    );
    const [qty, setQty] = useState(1);

    // Avbryter påbörjad toast-pop-up-animation vid omnavigering innan animationen är klar ↓
    useEffect(() => {
        return () => toast.remove();
        // För inkluderad fade-out: .dismiss() istället
    }, []);

    if (error) return <p>Error!</p>;

    // .find() returnerar ETT element från arrayen (det första som matchar), eller undefined
    const event = events.find((e) => e.id === id);
    if (!event) return <NotFoundPage />;

    return (
        <div className="eventpage__wrapper wrapper">
            <Header
                leftIcon="arrow"
                title="Event"
                rightIcon="cart"
                onLeftClick={() => navigate(-1)}
                onRightClick={() => navigate("/order")}
                rightIconBadge={cartTotal}
            />
            <EventDetails
                key={event.id}
                event={event}
                qty={qty}
                increase={() => setQty((prev) => prev + 1)}
                // Math.max(1, prev - 1) gör att man inte kan gå lägre än 1 ↓
                decrease={() => setQty((prev) => Math.max(1, prev - 1))}
            />
            <Footer
                btnText="Lägg i varukorgen"
                onClick={() => {
                    addToCart(event, qty);
                    // Anropar toast-pop-uppen ↓
                    toast.success("Tillagt i varukorgen!");
                    // Automatiska animations-inställningar av biblioteket självt ↑
                    // ".success" animerar en grön bock vid notis-texten ↑
                }}
            />
        </div>
    );
};

export default EventPage;
