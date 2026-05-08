import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./notFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="notfoundpage__wrapper wrapper">
            <Header title="Error!" />
            <h2 className="notfoundpage__message">Sidan hittades inte</h2>
            <Footer
                btnText="Till Events"
                onClick={() => navigate("/events")}
                tapEffect={false}
            />
        </div>
    );
};

export default NotFoundPage;
