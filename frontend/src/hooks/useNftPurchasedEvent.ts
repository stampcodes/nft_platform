import { useEffect, useState } from "react";
import { Contract, WebSocketProvider, formatEther, AbiCoder } from "ethers";
import contractAbi from "../abi/abi.json";

export interface NftPurchasedEvent {
  buyer: string;
  seller: string;
  tokenId: string;
  price: string;
  transactionHash: string;
}

const useNftPurchasedEvent = () => {
  const [events, setEvents] = useState<NftPurchasedEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contractAddress = "0xEA6f144F17642cb56aea505C7Eaa8CF04B65C480";

  useEffect(() => {
    const provider = new WebSocketProvider(
      `wss://eth-sepolia.g.alchemy.com/v2/${
        import.meta.env.VITE_ALCHEMY_API_KEY
      }`
    );
    const contract = new Contract(contractAddress, contractAbi.abi, provider);

    const fetchPastEvents = async () => {
      try {
        setIsLoading(true);
        const filter = contract.filters.NFTPurchased();
        const events = await contract.queryFilter(filter, 0, "latest");

        const abiCoder = new AbiCoder();

        const decodedEvents = events.map((event) => {
          const buyer = `0x${event.topics[1].slice(26)}`;
          const seller = `0x${event.topics[2].slice(26)}`;

          const decodedData = abiCoder.decode(
            ["uint256", "uint256"],
            event.data
          );
          const tokenId = decodedData[0];
          const price = decodedData[1];

          return {
            buyer,
            seller,
            tokenId: tokenId.toString(),
            price: formatEther(price),
            transactionHash: event.transactionHash,
          };
        });

        setEvents(decodedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  return { events, isLoading };
};

export default useNftPurchasedEvent;
