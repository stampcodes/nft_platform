import NftCard from "./NftCard";

type NftSaleListProps = {
  nfts: [bigint[], string[], bigint[]];
};

const NftSaleList: React.FC<NftSaleListProps> = ({ nfts }) => {
  const [tokenIds, uris, prices] = nfts;
  return (
    <div className="bgLab">
      <h2 className="text-4xl font-bold text-center text-white bg-[#2c2c2c] p-5">
        Marketplace
      </h2>
      <div className="w-full flex justify-center mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-lg">
          {tokenIds.map((tokenId, index) => (
            <NftCard
              key={tokenId.toString()}
              tokenId={tokenId}
              uri={uris[index]}
              price={prices[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NftSaleList;
