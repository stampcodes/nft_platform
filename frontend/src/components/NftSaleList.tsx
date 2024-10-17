import NFTCard from "../components/Nft/NftCard";

type NftSaleListProps = {
  nfts: [bigint[], string[], bigint[]];
};

const NftSaleList: React.FC<NftSaleListProps> = ({ nfts }) => {
  const [tokenIds, uris, prices] = nfts;
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="grid grid-cols-4 gap-1 max-w-screen-lg">
        {tokenIds.map((tokenId, index) => (
          <NFTCard
            key={tokenId.toString()}
            tokenId={tokenId}
            uri={uris[index]}
            price={prices[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default NftSaleList;
