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
    address: "0xbafC37EB206eA296Ff751Ac9C9351BeD393eF6Dd",
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
