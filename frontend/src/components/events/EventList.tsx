import EventCard from "./EventCard";
import { NftPurchasedEvent } from "../../hooks/useNftPurchasedEvent";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

type EventListProps = {
  events: NftPurchasedEvent[];
};

const EventList: React.FC<EventListProps> = ({ events }) => {
  const { address, isConnected } = useAccount();
  const [filteredEvents, setFilteredEvents] = useState<NftPurchasedEvent[]>([]);

  useEffect(() => {
    if (isConnected && address) {
      const filtered = events.filter(
        (event) =>
          event.buyer.toLowerCase() === address.toLowerCase() ||
          event.seller.toLowerCase() === address.toLowerCase()
      );
      setFilteredEvents(filtered);
    }
  }, [isConnected, address, events]);

  if (!isConnected) {
    return (
      <div className=" h-[100vh] flex justify-center  bgLab">
        <span className="VT323 text-white bg-[#2c2c2c] rounded-xl h-fit p-5 mt-5  text-4xl">
          {" "}
          No wallet connected
        </span>
      </div>
    );
  }

  return (
    <div className="bgLab">
      <h2 className="VT323 text-4xl font-bold text-center text-white bg-[#2c2c2c] p-5">
        Purchase History
      </h2>
      <div className="space-y-6 py-5 max-w-2xl mx-auto">
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
      </div>
    </div>
  );
};

export default EventList;
