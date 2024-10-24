import { useEffect, useState } from "react";
import NftName from "./NftName";
import NftImage from "./NftImage";
import NftPrice from "./NftPrice";
import { useNavigate } from "react-router-dom";
import loading from "../../assets/imgs/loading.gif";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          uri.replace("ipfs://", "https://dweb.link/ipfs/")
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
      {isLoading ? (
        <div className="LoadingIcon ">
          <img className="rounded-xl" src={loading} alt="loading..." />
        </div>
      ) : (
        metadata && (
          <>
            <NftImage imageUrl={metadata.image} />
            <NftName name={metadata.name} />
            <NftPrice price={price} />
          </>
        )
      )}
    </div>
  );
};

export default NftCard;
