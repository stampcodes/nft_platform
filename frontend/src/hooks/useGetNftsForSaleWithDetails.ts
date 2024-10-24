import { useReadContract } from "wagmi";
import contractAbi from "../abi/abi.json";

type NftsForSaleWithDetails = [bigint[], string[], bigint[]];

const useGetNftsForSaleWithDetails = () => {
  const {
    data: nftsForSaleWithDetails,
    error,
    isFetching: isPending,
    refetch,
  } = useReadContract({
    address: "0xEA6f144F17642cb56aea505C7Eaa8CF04B65C480",
    abi: contractAbi.abi,
    functionName: "getNftsForSaleWithDetails",
  });

  const parsedData = nftsForSaleWithDetails
    ? (nftsForSaleWithDetails as NftsForSaleWithDetails)
    : null;

  return {
    nftsForSaleWithDetails: parsedData,
    error,
    isPending,
    refetch,
  };
};

export default useGetNftsForSaleWithDetails;
