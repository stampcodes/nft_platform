import EventList from "../components/events/EventList";
import Navbar from "../components/Navbar";
import useNftPurchasedEvent from "../hooks/useNftPurchasedEvent";
import loading from "../assets/imgs/loading.gif";

const PurchaseHistoryPage = () => {
  const { events, isLoading } = useNftPurchasedEvent();

  if (isLoading)
    return (
      <div className="LoadingIcon">
        <img src={loading} alt="loading..." />
      </div>
    );

  return (
    <>
      <Navbar />
      <EventList events={events} />
    </>
  );
};

export default PurchaseHistoryPage;
