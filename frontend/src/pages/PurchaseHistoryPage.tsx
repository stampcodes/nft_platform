import EventList from "../components/events/EventList";
import Navbar from "../components/Navbar";
import useNftPurchasedEvent from "../hooks/useNftPurchasedEvent";

const PurchaseHistoryPage = () => {
  const { events } = useNftPurchasedEvent();
  return (
    <>
      <Navbar />
      <EventList events={events} />
    </>
  );
};

export default PurchaseHistoryPage;
