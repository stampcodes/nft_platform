// NFTPrice.tsx
import { ethers } from "ethers";

type NftPriceProps = {
  price: bigint;
};

const NftPrice: React.FC<NftPriceProps> = ({ price }) => {
  return (
    <p className="mt-3 border-none bg-[#00bfff] rounded-lg flex justify-center ">
      Price: {ethers.formatEther(price)} ETH
    </p>
  );
};

export default NftPrice;
