import { useCartStore } from "../../stores/useCartStore";
import OrderItem from "../OrderItem/OrderItem";
import "./orderItemsList.css";

const OrderItemsList = () => {
    const cart = useCartStore((state) => state.cart);
    if (cart.length === 0)
        return (
            <h2 className="orderpage__orderitemslist--no-item">
                Varukorgen är tom
            </h2>
        );
    return (
        <div className="orderpage__orderitemslist">
            {cart.map((event) => (
                <OrderItem key={event.id} event={event} />
            ))}
        </div>
    );
};

export default OrderItemsList;
