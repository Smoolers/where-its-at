import Button from "../Button/Button";
import "./footer.css";

const Footer = ({ btnText, onClick, tapEffect }) => {
    return (
        <footer className="footer">
            <Button btnText={btnText} onClick={onClick} tapEffect={tapEffect} />
        </footer>
    );
};

export default Footer;
