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

  const handleFetchDetails = async () => {
    try {
      await refetch();
    } catch (e) {
      console.error("Errore durante il refetch:", e);
    }
  };

  return {
    nftsForSaleWithDetails: parsedData,
    error,
    isPending,
    handleFetchDetails,
  };
};

export default useGetNftsForSaleWithDetails;
