import ticketIcon from "../../assets/ticket.svg";
import cartIcon from "../../assets/shopping-cart.svg";
import arrowIcon from "../../assets/arrow-left.svg";
import searchIcon from "../../assets/search-1.svg";
import minusIcon from "../../assets/minus.svg";
import plusIcon from "../../assets/plus.svg";
import deleteIcon from "../../assets/trash.svg";
import "./icon.css";

const Icon = ({ name, alt, className, onClick, badge }) => {
    const icons = {
        ticket: ticketIcon,
        cart: cartIcon,
        arrow: arrowIcon,
        search: searchIcon,
        decrease: minusIcon,
        increase: plusIcon,
        delete: deleteIcon,
    };

    return (
        <div className="icon__wrapper" onClick={onClick}>
            <img src={icons[name]} alt={alt} className={className} />
            {badge > 0 && <span className="icon__badge">{badge}</span>}
        </div>
        // Rendera span bara om det finns något innehåll
    );
};

export default Icon;
