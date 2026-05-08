import { motion } from "framer-motion";
// Ger animationsförmågor via motion-versioner av HTML-element ↑
import "./button.css";

const Button = ({ btnText, onClick, tapEffect = true }) => {
    return (
        <motion.button
            className="footer__btn"
            onClick={onClick}
            // whileTap - animationstillstånd som är aktiverat så länge nertryckning sker ↓
            // scale: 0.96 krymper knappen till 96% storlek (för nertryckningskänsla)
            whileTap={tapEffect ? { scale: 0.96 } : {}}
            // Med Ternary operator (och prop från förälder) pga omdirigeringsknappar vill inte ha denna animation ↑
        >
            {btnText}
        </motion.button>
    );
};

export default Button;
