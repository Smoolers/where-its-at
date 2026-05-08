import { motion } from "framer-motion";
// Ger animationsförmågor via motion-versioner av HTML-element ↑
import { Link } from "react-router-dom";
import "./eventItem.css";

// De två motion-varianterna av EventItem - hidden och visible ↓
const eventItemVariants = {
    // Osynlig + 15 pixlar åt höger ↓
    hidden: { opacity: 0, x: 15 },
    visible: {
        // Synlig + på plats ↓
        opacity: 1,
        x: 0,
        // Tar 0.1 sek på sig + mjuk inbromsning ↓
        transition: { duration: 0.1, ease: "easeOut" },
    },
};

const EventItem = ({ event }) => {
    return (
        <>
            <Link className="eventitem__link" to={`/event/${event.id}`}>
                <motion.article
                    // Namngivet objekt med animationstillstånd ↓
                    variants={eventItemVariants}
                    // variants berättar vad "hidden" och "visible" i praktiken visuellt resulterar i för det här specifika elementet (här article)
                    // De implementeras automatiskt från förälderns (EventsList) egna initial/animate
                    className="eventitem__wrapper wrapper"
                >
                    <section className="eventitem__date-square">
                        <div className="eventitem__date-container">
                            <p className="eventitem__date-day">
                                {event.when.date.split(" ")[0]}
                            </p>
                            <p className="eventitem__date-month">
                                {event.when.date
                                    .split(" ")[1]
                                    .slice(0, 3)
                                    .toUpperCase()}
                            </p>
                        </div>
                    </section>
                    <div className="eventitem__info-container">
                        <h2 className="eventitem__artist">{event.name}</h2>
                        <p className="eventitem__location">{event.where}</p>
                        <div className="eventitem__time-price-container">
                            <p className="eventitem__time">
                                {event.when.from} - {event.when.to}
                            </p>
                            <p className="eventitem__price">{event.price} kr</p>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </>
    );
};

export default EventItem;
