import { ethers } from "ethers";
import { useEffect, useState } from "react";

type NftDetailsProps = {
  details: [bigint, string, bigint];
};

const NftDetails: React.FC<NftDetailsProps> = ({ details }) => {
  const [tokenId, uri, price] = details;
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    console.log("Fetching metadata for URI:", uri);
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          uri.replace("ipfs://", "https://ipfs.io/ipfs/")
        );
        const data = await response.json();

        setMetadata(data);
      } catch (error) {
        console.error("Errore nel recupero dei metadati:", error);
      }
    };

    fetchMetadata();
  }, [uri]);

  const httpImageUrl = metadata?.image?.replace(
    "ipfs://",
    "https://ipfs.io/ipfs/"
  );

  return (
    <>
      <img
        src={httpImageUrl}
        alt="NFT Image"
        width="512"
        className="rounded-xl mb-3"
      />
      <p>
        {" "}
        {metadata?.name} ({`ID: ${tokenId}`}){" "}
      </p>
      <p>Price: {ethers.formatEther(price)} ETH</p>
    </>
  );
};

export default NftDetails;
