import EventsList from "../../components/EventsList/EventsList";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { useTicketStore } from "../../stores/useTicketStore";
import "./eventsPage.css";

const EventsPage = () => {
    const navigate = useNavigate();
    const cartTotal = useCartStore((state) =>
        state.cart.reduce((acc, event) => {
            return acc + event.qty;
        }, 0),
    );
    const ticketsTotal = useTicketStore((state) => state.tickets.length);

    return (
        <div className="eventspage__wrapper wrapper">
            <Header
                leftIcon="ticket"
                title="Events"
                rightIcon="cart"
                onLeftClick={() => navigate("/tickets")}
                onRightClick={() => navigate("/order")}
                leftIconBadge={ticketsTotal}
                rightIconBadge={cartTotal}
            />
            <SearchBar icon="search" />

            <EventsList />
        </div>
    );
};

export default EventsPage;
