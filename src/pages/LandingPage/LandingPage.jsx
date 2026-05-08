import { motion } from "framer-motion";
// Ger animationsförmågor via motion-versioner av HTML-element ↑
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./landingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();
    const [fade, setFade] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => setFade(true), 3000);
        return () => clearTimeout(timerRef.current);
    }, []);

    const handleLogoClick = () => {
        clearTimeout(timerRef.current);
        navigate("/events");
    };

    return (
        <div
            className={`landingpage__wrapper wrapper${fade ? " landingpage__wrapper--fade-out" : ""}`}
            onTransitionEnd={() => navigate("/events")}
        >
            <motion.img
                // Utgångsvärde vid animationsstart (osynlig + placerad 20 pixlar upp) ↓
                initial={{ opacity: 0, y: -20 }}
                // Animations-målpunkten (synlig + på plats) + gungrörelse (genom array med vinkelvärden) ↓
                animate={{
                    opacity: 1,
                    y: 0,
                    rotate: [0, -4, 4, -4, 4, 0],
                }}
                // Hur animationen sker, per egenskap ↓
                transition={{
                    // Synlighet + placeringstransport tar 0.6 sek, och tar 0.2 sek på sig att starta ↓
                    opacity: { duration: 0.6, delay: 0.2 },
                    y: { duration: 0.6, delay: 0.2 },
                    // Gungrörelsen tar 0.4 sek, med 1.4 sek fördröjning ↓
                    rotate: {
                        duration: 0.4,
                        delay: 1.4,
                    },
                }}
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                src={logo}
                alt="App Logo"
                className="landingpage__logo"
            />
            <motion.h1
                // Utgångspunkt: osynlig + start 20 pixlar åt höger ↓
                initial={{ opacity: 0, x: 20 }}
                // Slutpunkt: synlig + på plats ↓
                animate={{ opacity: 1, x: 0 }}
                // Tar 0.5 sek att utföra, med 0.4 sek fördröjning ↓
                transition={{ duration: 0.5, delay: 0.4 }}
                className="landingpage__title"
            >
                Where It's @
            </motion.h1>
            <motion.h2
                // Utgångspunkt: osynlig + start 20 pixlar åt vänster ↓
                initial={{ opacity: 0, x: -20 }}
                // Slutpunkt: synlig + på plats ↓
                animate={{ opacity: 1, x: 0 }}
                // Tar 0.5 sek att utföra, med 0.6 sek fördröjning ↓
                transition={{ duration: 0.5, delay: 0.6 }}
                className="landingpage__subtitle"
            >
                Ticketing made easy
            </motion.h2>
        </div>
    );
};

export default LandingPage;
