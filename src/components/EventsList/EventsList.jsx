import { useEffect } from "react";
import { motion } from "framer-motion";
// Ger animationsförmågor via motion-versioner av HTML-element ↑
import EventItem from "../EventItem/EventItem";
import { useEventStore } from "../../stores/useEventStore";
import "./eventsList.css";

// Variabel för om animationen skett än (false = vid första besöket, nej) ↓
let hasAnimated = false;

// Samma namn som i eventItemVariants i EventItem (EventsLists barn) - hidden och visible - vilket framer-motion kopplar (alla får samma animationsstyrning) ↓
const containerVariants = {
    // Tomt objekt (behöver ändå definieras för att motion ska ha något att utgå från) ↓
    hidden: {},
    // Kör barn-elementens animationer 0.08 sek efter varann ↓
    visible: { transition: { staggerChildren: 0.08 } },
};

const EventsList = () => {
    // Ingen "loading" här, hanteras globalt (App.jsx) ↓
    const { events, error } = useEventStore();

    // useEffect för att sätta animationen till att ha skett, när den nu gjort det ↓
    useEffect(() => {
        hasAnimated = true;
    }, []);

    if (error) return <p>Error!</p>;

    return (
        <motion.section
            // Objektet med animationstillståndet ↓
            variants={containerVariants}
            // Sätt initial till false om animationen redan skett, dvs då sker den inte igen (t ex vid tillbaka-navigationer) ↓
            // Har den inte skett än, kör startpunkt "hidden" (se containerVariants) ↓
            initial={hasAnimated ? false : "hidden"}
            // Slutpunkt (se "visible", containerVariants) ↓
            animate="visible"
            className="eventspage__eventslist"
        >
            {events.map((event) => {
                return <EventItem key={event.id} event={event} />;
            })}
        </motion.section>
    );
};

export default EventsList;
