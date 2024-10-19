import { ethers } from "ethers";

type NftPriceProps = {
  price: bigint;
};

const NftPrice: React.FC<NftPriceProps> = ({ price }) => {
  return (
    <p className=" mt-3 border-none text-white rounded-lg flex justify-center ">
      Price :
      <span className="ml-3 text-[#00bfff]">
        {" "}
        {ethers.formatEther(price)} ETH
      </span>
    </p>
  );
};

export default NftPrice;
