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
    address: "0xEA6f144F17642cb56aea505C7Eaa8CF04B65C480",
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
