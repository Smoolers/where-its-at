import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import TicketsList from "../../components/TicketsList/TicketsList";
import Footer from "../../components/Footer/Footer";
import { useCartStore } from "../../stores/useCartStore";
import { useTicketStore } from "../../stores/useTicketStore";
import confetti from "canvas-confetti";
// Import av confetti (som är en enda "vanlig" funktion) ↑
import "./ticketsPage.css";

const TicketsPage = () => {
    const navigate = useNavigate();
    const tickets = useTicketStore((state) => state.tickets);
    const clearCart = useCartStore((state) => state.clearCart);
    // useLocation kan användas för att läsa "state", data som kan skickas med vid navigation (ej synligt i URL:en) ↓
    const location = useLocation();
    // I detta fall skickas state från OrderPage.jsx - navigate("/tickets", { state: { fromOrder: true } }); ↑
    const [isProcessing, setIsProcessing] = useState(
        !!location.state?.fromOrder,
    );
    // "!!" gör ett värde till ett "äkta" booleanskt värde (inte bara truthy/falsy, utan exakt true eller false) ↑ ↓
    // "?.", optional chaining, läser en egenskap på ett objekt, men krashar inte om objektet är "null" eller "undefined" (returnerar bara undefined istället). Om state inte finns skulle bara "location.state.fromOrder" ge fel.
    const [fromOrder] = useState(!!location.state?.fromOrder);
    // Finns fromOrder och det är true --> true. Saknas state eller fromOrder --> false.
    // useState garanteras ett rent booleanskt värde, oavsett innehåll i location state.

    useEffect(() => {
        // Kommer man från OrderPage? (bara därifrån skickas "fromOrder: true" med) ↓
        if (location.state?.fromOrder) {
            clearCart();
            confetti({
                // Antal konfetti-partiklar ↓
                particleCount: 155,
                // Utskjutningsvinkel i grader ↓
                spread: 160,
                // Utskjutningspunkt (0.55 är strax under mitten) ↓
                origin: { y: 0.55 },
            });
            // Motverkar att trigga confetti-effekten även vid refresh (tar bort "fromOrder" från webbläsarhistoriken) ↓
            window.history.replaceState({}, "");
        }
        // Loading-ikonen visas så länge isProcessing är true, men stängs av efter 600ms ↓
        // Det bör vara tillräckligt med svängrum för att inte "Inga biljetter" ska hinna blinka till (vilket det annars skulle kunna göra, vid stort biljett-inköp!)
        const timer = setTimeout(() => setIsProcessing(false), 600);
        // Städnings-funktion av detta, som React anropar när användaren navigerar bort från sidan ↓
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="ticketpage__wrapper wrapper">
            <div className="ticketpage__header-tickets-footer-container">
                <Header
                    leftIcon={!fromOrder ? "arrow" : undefined}
                    onLeftClick={!fromOrder ? () => navigate(-1) : undefined}
                    title="Tickets"
                />
                <TicketsList
                    isProcessing={isProcessing}
                    fromOrder={fromOrder}
                />
                {tickets.length > 0 && fromOrder && (
                    <Footer
                        btnText="Till Events"
                        onClick={() => navigate("/events")}
                        tapEffect={false}
                    />
                )}
            </div>
        </div>
    );
};

export default TicketsPage;
