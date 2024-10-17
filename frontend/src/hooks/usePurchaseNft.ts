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
      address: "0xbafC37EB206eA296Ff751Ac9C9351BeD393eF6Dd",
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
