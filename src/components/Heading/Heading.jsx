import "./heading.css";

const Heading = ({ title }) => {
    return (
        <>
            <h1 className="header__title">{title}</h1>
        </>
    );
};

export default Heading;
