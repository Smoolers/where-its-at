import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// Import av "v4" (slumpad ID-generering) under namnet "uuidv4", från uuid ↑
import Header from "../../components/Header/Header";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import TotalValue from "../../components/TotalValue/TotalValue";
import Footer from "../../components/Footer/Footer";
import { useCartStore } from "../../stores/useCartStore";
import { useTicketStore } from "../../stores/useTicketStore";
import "./orderPage.css";

const OrderPage = () => {
    const navigate = useNavigate();
    const cart = useCartStore((state) => state.cart);
    const addTickets = useTicketStore((state) => state.addTickets);
    const sections = ["A", "B", "C", "D", "E"];
    const sectionSize = 100;
    // Tar emot antal biljetter, returnerar platser ↓
    function generateSeats(qty) {
        // Slumpar fram en sektion (index 0-4) ↓
        const sectionIndex = Math.floor(Math.random() * sections.length);
        // Räknar ut vald sektions platsintervall ↓
        const sectionStart = sectionIndex * sectionSize + 1;
        const sectionEnd = sectionStart + sectionSize - 1;
        // T ex Sektion D (index 3) ↓
        // sectionStart = 3 * 100 + 1 = 301
        // sectionEnd = 301 + 100 - 1 = 400

        // Högsta möjliga startnummer (för att alla qty ska rymmas inom sektionen) ↓
        const maxStart = sectionEnd - qty + 1;
        // Dvs för t ex 3 beställda biljetter i Sektion B får startplatsen vara högst 198:
        // 200 - 3 + 1 = 198

        // Slumpar fram ett platsstartnummer mellan sectionStart och maxStart ↓
        const startSeat =
            Math.floor(Math.random() * (maxStart - sectionStart + 1)) +
            sectionStart;

        // Skapar qty-platsobjekt med intilliggande nummer ↓
        // Ett sätt att skapa en array av "qty" antal platsobjekt, i ett steg ↓
        return Array.from({ length: qty }, (_, i) => {
            // "_" = oanvänd parameter (i detta fall för element) ↑
            const seat = startSeat + i;
            const section = sections[Math.floor((seat - 1) / sectionSize)];
            return { section, seat };
        });
    }

    // Skapar ett biljettobjekt per plats ↓
    const handleOrder = () => {
        // .flatMap plattar ut en array med eventuella andra arrayer i (som kan hända vid flertalet biljetter + olika evenemang), gör dem till en enda vanlig array, och returnerar den ↓
        const newTickets = cart.flatMap((item) => {
            const seats = generateSeats(item.qty);
            return seats.map((seatInfo) => ({
                // Spread operatorn kopierar alla befintliga egenskaper från item (artist, pris osv), in i det nya biljettobjektet ↓
                //  Och sen läggs den nya platsspecifika informationen till (barcodeId, section och seat) ↓
                ...item,
                // "uuidv4()" anropar import-funktionen från uuid ↓
                // Slumpar fram nytt unikt ID varje gång (36 tecken) (tar 5 med slice) ↓
                barcodeId: uuidv4().slice(0, 5),
                section: seatInfo.section,
                seat: seatInfo.seat,
            }));
        });
        addTickets(newTickets);
        navigate("/tickets", { state: { fromOrder: true } });
    };

    return (
        <div className="orderpage__wrapper wrapper">
            <div className="orderpage__content">
                <Header
                    leftIcon="arrow"
                    title="Order"
                    onLeftClick={() => navigate(-1)}
                />
                <OrderItemsList />
                {/* Renderar bara om något finns i varukorgen ↓ */}
                {cart.length > 0 && <TotalValue />}
                {cart.length > 0 && (
                    <Footer
                        btnText="Skicka order"
                        onClick={handleOrder}
                        tapEffect={false}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderPage;
