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
    <div className="bgLab">
      <h2 className="font-bold text-center text-white bg-[#2c2c2c] p-5 text-3xl sm:text-4xl">
        Purchase History
      </h2>
      <div className="flex justify-center py-10 px-4 sm:px-0">
        <div className="bg-[#00274d] text-white rounded-xl shadow-lg w-full max-w-full sm:max-w-2xl p-5 sm:p-10">
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
      </div>
    </div>
  );
};

export default EventCard;
