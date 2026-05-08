import { useCartStore } from "../../stores/useCartStore";
import "./totalValue.css";

const TotalValue = () => {
    const cart = useCartStore((state) => state.cart);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="orderpage__totalvalue-container">
            <h2 className="orderpage__totalvalue-title">Värde totalt:</h2>
            <h2 className="orderpage__totalvalue-price">{total} kr</h2>
        </div>
    );
};

export default TotalValue;
