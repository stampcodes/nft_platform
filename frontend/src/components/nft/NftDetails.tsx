import { ethers } from "ethers";
import { useEffect, useState } from "react";
import PurchaseButton from "./PurchaseButton";
import colorLoading from "../../assets/imgs/colorLoading.gif";

type NftDetailsProps = {
  details: [bigint, string, bigint];
};

const NftDetails: React.FC<NftDetailsProps> = ({ details }) => {
  const [tokenId, uri, price] = details;
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          uri.replace("ipfs://", "https://dweb.link/ipfs/")
        );
        const data = await response.json();

        setMetadata(data);
      } catch (error) {
        console.error("Errore nel recupero dei metadati:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [uri]);

  const httpImageUrl = metadata?.image?.replace(
    "ipfs://",
    "https://dweb.link/ipfs/"
  );

  return (
    <>
      <div className="bgLab">
        <h2 className="VT323 text-4xl font-bold text-center text-white bg-[#2c2c2c] p-5">
          NFT Details
        </h2>
        <div className="flex justify-center items-start">
          <div className="flex flex-col md:flex-row justify-center items-center p-5 w-[95%] md:w-[80%] lg:w-[65%] xl:w-[60%] 2xl:w-[55%] rounded-xl bg-[#00274d] mt-5">
            {isLoading ? (
              <div className="LoadingIcon">
                <img
                  src={colorLoading}
                  alt="Loading..."
                  className="rounded-xl"
                />
              </div>
            ) : (
              metadata && (
                <div className="flex flex-col md:flex-row justify-around items-center w-full md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px]">
                  <img
                    src={httpImageUrl}
                    alt="NFT Image"
                    className="rounded-xl w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[512px]"
                  />
                  <div className="flex flex-col justify-center items-start mt-5 md:mt-0 md:ml-5 w-full md:w-auto">
                    <p className="text-2xl sm:text-3xl md:text-4xl mb-4 text-white">
                      {metadata?.name}
                    </p>
                    <p className="mb-5 text-white">{metadata?.description}</p>
                    <p className="text-2xl sm:text-3xl md:text-4xl text-white">
                      Price:{" "}
                      <span className="text-[#00bfff]">
                        {ethers.formatEther(price)} ETH
                      </span>
                    </p>
                    <PurchaseButton tokenId={tokenId} price={price} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetails;
