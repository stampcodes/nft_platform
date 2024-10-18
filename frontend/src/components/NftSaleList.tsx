import NftCard from "./nft/NftCard";

type NftSaleListProps = {
  nfts: [bigint[], string[], bigint[]];
};

const NftSaleList: React.FC<NftSaleListProps> = ({ nfts }) => {
  const [tokenIds, uris, prices] = nfts;
  return (
    <div className="bg-gradient-to-b from-[#e0f7fa] to-[#f0f4f8] min-h-screen w-full py-10">
      <div className="w-full flex justify-center mt-4 ">
        <div className="grid grid-cols-4 gap-1 max-w-screen-lg">
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
