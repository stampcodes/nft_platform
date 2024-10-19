type EventCardProps = {
  buyer: string;
  seller: string;
  tokenId: string;
  price: string;
  transactionHash: string;
};

const EventCard: React.FC<EventCardProps> = ({
  buyer,
  seller,
  tokenId,
  price,
  transactionHash,
}) => {
  const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;

  return (
    <div className="bg-[#00274d] text-white rounded-xl shadow-lg w-full p-5 sm:p-10">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-semibold text-white">Buyer:</span>
          <span className="text-white break-all">{buyer}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-semibold text-white">Seller:</span>
          <span className="text-white break-all">{seller}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-semibold text-white">Token ID:</span>
          <span className="text-white">{tokenId}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-semibold text-white">Price:</span>
          <span className="text-white">{price} ETH</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <a
          className="customButton"
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Details on Etherscan
        </a>
      </div>
    </div>
  );
};

export default EventCard;
