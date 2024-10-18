import { ethers } from "ethers";
import { useEffect, useState } from "react";
import PurchaseButton from "./PurchaseButton";

type NftDetailsProps = {
  details: [bigint, string, bigint];
};

const NftDetails: React.FC<NftDetailsProps> = ({ details }) => {
  const [tokenId, uri, price] = details;
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
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
      <div className="bg-gradient-to-b from-[#e0f7fa] to-[#f0f4f8] min-h-screen w-full py-10">
        <div className="flex justify-center">
          <div className="flex justify-around items-center  w-[1100px] mt-5 ">
            <img
              src={httpImageUrl}
              alt="NFT Image"
              width="512"
              className="rounded-xl"
            />
            <div className="flex flex-col justify-center items-start ml-5">
              <p className=" text-4xl mb-10"> {metadata?.name}</p>
              <p className="mb-5">{metadata?.description}</p>
              <p className=" text-4xl ">
                Price: {ethers.formatEther(price)} ETH
              </p>
              <PurchaseButton tokenId={tokenId} price={price} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetails;
