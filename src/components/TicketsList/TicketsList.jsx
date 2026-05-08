// Swiper = Hela karusellen
// SwiperSlide = Den enskilda sidan i karusellen
import { Swiper, SwiperSlide } from "swiper/react";
// EffectCards = Den specifika pluginen som ger kortlekseffekten
import { EffectCards } from "swiper/modules";
import TicketItem from "../TicketItem/TicketItem";
import { useTicketStore } from "../../stores/useTicketStore";
import spinnerIcon from "../../assets/spinner.svg";
import "./ticketsList.css";
// Swipers grundläggande stil ↓
import "swiper/css";
// Kortlekseffektens specifika stil ↓
import "swiper/css/effect-cards";

const TicketsList = ({ isProcessing, fromOrder }) => {
    const tickets = useTicketStore((state) => state.tickets);

    if (tickets.length === 0 && isProcessing)
        return (
            <img
                src={spinnerIcon}
                alt="Loading.."
                className="loading-spinner"
            />
        );
    if (tickets.length === 0)
        return (
            <h2 className="ticketspage__ticketslist--no-item">
                Inga biljetter
            </h2>
        );

    return (
        <Swiper
            // Registrerar EffectCard-pluginen (inom det generella Swiper) ↓
            modules={[EffectCards]}
            // Säger vilken effekt inom pluginen som ska användas ↓
            effect="cards"
            // Gör muspekaren till hand vid hovring ↓
            grabCursor={true}
            className={`ticketspage__ticketslist${!fromOrder ? " ticketspage__ticketslist--no-footer" : ""}`}
        >
            {/* Swiper vill ha SwiperSlides som barn */}
            {/* Varje biljett i tickets-arrayen mappas till varsina SwiperSlide's ↓ */}
            {tickets.map((ticket) => (
                <SwiperSlide key={ticket.barcodeId}>
                    {/* I varje SwiperSlide renderas ett TicketItem, med biljett-datan ↓ */}
                    <TicketItem ticket={ticket} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TicketsList;
