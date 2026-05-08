import Barcode from "react-barcode";
// Import av Barcode-komponent (renderar streckkod som svg direkt i DOM:en) ↑
import "./ticketItem.css";

const TicketItem = ({ ticket }) => {
    const [day, month] = ticket.when.date.split(" ");
    return (
        <article className="ticketspage__ticketitem-container">
            <div className="ticketspage__artist-container">
                <p className="ticketspage__artist-title">WHAT</p>
                <h2 className="ticketspage__artist">{ticket.name}</h2>
            </div>
            <div className="ticketspage__location-container">
                <p className="ticketspage__location-title">WHERE</p>
                <h2 className="ticketspage__location">{ticket.where}</h2>
            </div>
            <div className="ticketspage__when-from-to-container">
                <div className="ticketspage__when-container">
                    <p className="ticketspage__when-title">WHEN</p>
                    <h2 className="ticketspage__when">
                        {day} {month.slice(0, 3)}
                    </h2>
                </div>
                <div className="ticketspage__from-container">
                    <p className="ticketspage__from-title">FROM</p>
                    <h2 className="ticketspage__from">{ticket.when.from}</h2>
                </div>
                <div className="ticketspage__to-container">
                    <p className="ticketspage__to-title">TO</p>
                    <h2 className="ticketspage__to">{ticket.when.to}</h2>
                </div>
            </div>
            <div className="ticketspage__info-container">
                <p className="ticketspage__info-title">INFO</p>
                <div className="ticketspage__info">
                    <p>Section: {ticket.section}</p>
                    <p>Seat: {ticket.seat}</p>
                </div>
            </div>
            <div className="ticketspage__barcode-container">
                {/* Barcode-komponenten ↓ */}
                <Barcode
                    // Skapar streck-mönstret ↓
                    value={ticket.barcodeId}
                    // Stänger av text-visning under barcoden (sköts där av p-elementet istället) ↓
                    displayValue={false}
                    // Pixelbredd per streck ↓
                    width={2.05}
                    // Streckens höjd i pixlar ↓
                    height={60}
                    // Bakgrundsfärg ↓
                    background="transparent"
                    // Streckkodens margin ↓
                    margin={5}
                    // Streckens färg ↓
                    lineColor="rgba(0, 0, 0, 0.8)"
                    className="ticketspage__barcode"
                />
                <p className="ticketspage__barcode-id">#{ticket.barcodeId}</p>
            </div>
        </article>
    );
};

export default TicketItem;
