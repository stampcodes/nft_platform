import EventCard from "./EventCard";
import { NftPurchasedEvent } from "../../hooks/useNftPurchasedEvent";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

type EventListProps = {
  events: NftPurchasedEvent[];
};

const EventList: React.FC<EventListProps> = ({ events }) => {
  const { address } = useAccount();
  const [filteredEvents, setFilteredEvents] = useState<NftPurchasedEvent[]>([]);

  useEffect(() => {
    if (address) {
      const filtered = events.filter(
        (event) =>
          event.buyer.toLowerCase() == address.toLowerCase() ||
          event.seller.toLowerCase() == address.toLowerCase()
      );
      setFilteredEvents(filtered);
    }
  }, [address, events]);

  return (
    <>
      {filteredEvents.map((event) => (
        <EventCard
          key={event.tokenId}
          buyer={event.buyer}
          seller={event.seller}
          tokenId={event.tokenId}
          price={event.price}
          transactionHash={event.transactionHash}
        />
      ))}
    </>
  );
};

export default EventList;
