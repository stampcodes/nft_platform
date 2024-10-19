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
      <div className="bgLab">
        <h2 className="text-4xl font-bold text-center  text-white bg-[#2c2c2c] p-5 ">
          NFT Details
        </h2>
        <div className=" flex justify-center items-start">
          <div className="flex justify-center items-center  p-5 w-[55%] rounded-xl bg-[#00274d] mt-5 ">
            <div className="flex justify-around items-center w-[1100px] ">
              <img
                src={httpImageUrl}
                alt="NFT Image"
                width="512"
                className="rounded-xl"
              />
              <div className="flex flex-col justify-center items-start ml-5 ">
                <p className=" text-4xl mb-10 text-white"> {metadata?.name}</p>
                <p className="mb-5 text-white">{metadata?.description}</p>
                <p className=" text-4xl text-white">
                  Price :{" "}
                  <span className="text-[#00bfff]">
                    {" "}
                    {ethers.formatEther(price)} ETH{" "}
                  </span>
                </p>
                <PurchaseButton tokenId={tokenId} price={price} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetails;
