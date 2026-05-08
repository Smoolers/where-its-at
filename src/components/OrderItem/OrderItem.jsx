import { useCartStore } from "../../stores/useCartStore";
import Icon from "../Icon/Icon";
import "./orderItem.css";

const OrderItem = ({ event }) => {
    const deleteFromCart = useCartStore((state) => state.deleteFromCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <article className="orderpage__orderitem-container">
            <div className="orderpage__eventinfo-container">
                <h2 className="orderpage__eventinfo-artist">{event.name}</h2>
                <p className="orderpage__eventinfo-date-time">
                    {event.when.date} kl {event.when.from} - {event.when.to}
                </p>
            </div>
            <div
                className="orderpage__deleteicon-container"
                onClick={() => deleteFromCart(event.id)}
            >
                <Icon
                    name="delete"
                    className="orderpage__deleteicon"
                    alt="delete"
                />
            </div>
            <div
                className={`orderpage__decrease-container${event.qty === 1 ? " orderpage__decrease-container--disabled" : ""}`}
                onClick={
                    event.qty > 1 ? () => removeFromCart(event.id) : undefined
                }
            >
                <Icon
                    name="decrease"
                    className="orderpage__decrease"
                    alt="decrease"
                />
            </div>
            <div className="orderpage__tickets-container">
                <h3 className="orderpage__tickets">{event.qty}</h3>
            </div>
            <div
                className="orderpage__increase-container"
                onClick={() => addToCart(event, 1)}
            >
                <Icon
                    name="increase"
                    className="orderpage__increase"
                    alt="increase"
                />
            </div>
        </article>
    );
};

export default OrderItem;
