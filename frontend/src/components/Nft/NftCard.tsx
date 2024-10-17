import { useEffect, useState } from "react";
import NftName from "./NftName";
import NftImage from "./NftImage";
import NftPrice from "./NftPrice";
import { useNavigate } from "react-router-dom";

type NftCardProps = {
  tokenId: bigint;
  uri: string;
  price: bigint;
};

const NftCard: React.FC<NftCardProps> = ({ tokenId, uri, price }) => {
  const [metadata, setMetadata] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch(
        uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      );
      const data = await response.json();
      setMetadata(data);
    };

    fetchMetadata();
  }, [uri]);

  const handleCardClick = () => {
    navigate(`/market/${tokenId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border-none p-3 m-3 rounded-xl bg-[#01ef03] card "
    >
      {metadata && (
        <>
          <NftImage imageUrl={metadata.image} />
          <NftName name={metadata.name} tokenId={tokenId} />
          <NftPrice price={price} />
        </>
      )}
    </div>
  );
};

export default NftCard;
