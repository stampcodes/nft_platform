import { useReadContract } from "wagmi";
import contractAbi from "../abi/abi.json";

type NftDetails = [bigint, string, bigint];

const useGetNftDetails = (tokenId: bigint) => {
  const {
    data: nftDetails,
    error,
    isFetching: isPending,
    refetch,
  } = useReadContract({
    address: "0xbafC37EB206eA296Ff751Ac9C9351BeD393eF6Dd",
    abi: contractAbi.abi,
    functionName: "getNftDetails",
    args: [tokenId],
  });

  const parsedData = nftDetails ? (nftDetails as NftDetails) : null;

  return {
    nftDetails: parsedData,
    error,
    isPending,
    refetch,
  };
};

export default useGetNftDetails;
