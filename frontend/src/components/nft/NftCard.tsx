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
interface NftMetadata {
  image: string;
  name: string;
}

const NftCard: React.FC<NftCardProps> = ({ tokenId, uri, price }) => {
  const [metadata, setMetadata] = useState<NftMetadata | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          uri.replace("ipfs://", "https://ipfs.io/ipfs/")
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMetadata();
  }, [uri]);

  const handleCardClick = () => {
    navigate(`/market/${tokenId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border-none p-3 m-3 rounded-xl bg-[#00274d] card "
    >
      {metadata && (
        <>
          <NftImage imageUrl={metadata.image} />
          <NftName name={metadata.name} />
          <NftPrice price={price} />
        </>
      )}
    </div>
  );
};

export default NftCard;