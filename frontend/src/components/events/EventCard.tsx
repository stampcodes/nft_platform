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
    <div className="bg-gradient-to-b from-[#e0f7fa] to-[#f0f4f8] min-h-screen w-full py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#00bfff]">
        Purchase History
      </h2>
      <div className="flex justify-center py-10">
        <div className="bg-[#00274d] text-white rounded-xl shadow-lg max-w-2xl w-full p-10 border border-gray-300">
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="font-semibold text-white ">Buyer:</span>
              <span className="text-white break-all">{buyer}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Seller:</span>
              <span className=" text-white break-all">{seller}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Token ID:</span>
              <span className="text-white">{tokenId}</span>
            </div>
            <div className="flex justify-between">
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
      </div>
    </div>
  );
};

export default EventCard;
