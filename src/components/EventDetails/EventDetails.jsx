import Icon from "../Icon/Icon";
import "./eventDetails.css";

const EventDetails = ({ event, qty, increase, decrease }) => {
    return (
        <article className="eventpage__eventdetails-container">
            <div className="eventpage__eventinfo-container">
                <h2 className="eventpage__eventinfo-artist">{event.name}</h2>
                <p className="eventpage__eventinfo-date-time">
                    {event.when.date} kl {event.when.from} - {event.when.to}
                </p>
                <p className="eventpage__eventinfo-location">{event.where}</p>
            </div>
            <div className="eventpage__price-tickets-container">
                <div className="eventpage__price-container">
                    <h3 className="eventpage__price">{event.price} kr</h3>
                </div>
                <div className="eventpage__dti-container">
                    <div
                        className={`eventpage__decrease-container${qty === 1 ? " eventpage__decrease-container--disabled" : ""}`}
                        onClick={decrease}
                    >
                        <Icon
                            name="decrease"
                            className="eventpage__decrease"
                            alt="decrease"
                        />
                    </div>
                    <div className="eventpage__tickets-container">
                        <h3 className="eventpage__tickets">{qty}</h3>
                    </div>
                    <div
                        className="eventpage__increase-container"
                        onClick={increase}
                    >
                        <Icon
                            name="increase"
                            className="eventpage__increase"
                            alt="increase"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default EventDetails;
