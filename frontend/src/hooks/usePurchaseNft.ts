import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import contractAbi from "../abi/abi.json";

const usePurchaseNft = (tokenId: bigint, price: bigint) => {
  const {
    data: hash,
    error: error,
    isPending: isPending,
    writeContract,
  } = useWriteContract();

  async function handlePurchaseNft(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    writeContract({
      address: "0xEA6f144F17642cb56aea505C7Eaa8CF04B65C480",
      abi: contractAbi.abi,
      functionName: "purchaseNft",
      args: [tokenId],
      value: price,
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    handlePurchaseNft,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseNft;
