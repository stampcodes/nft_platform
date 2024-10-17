import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NftDetails from "../components/NftDetails";
import useGetNftDetails from "../hooks/useGetNftDetails";
import { useParams } from "react-router-dom";
import loading from "../assets/imgs/loading.gif";

const NftDetailsPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  console.log("Token ID:", tokenId);

  if (!tokenId) return <div>ID token not exist</div>;
  const { nftDetails, error, isPending, refetch } = useGetNftDetails(
    BigInt(tokenId)
  );

  console.log("NFT Details:", nftDetails);

  useEffect(() => {
    refetch();
  }, []);

  if (isPending)
    return (
      <div className="LoadingIcon">
        <img src={loading} alt="loading..." />
      </div>
    );
  if (error) return <div>Error in loading NFT details: {error.message}</div>;
  if (!nftDetails) return <div>No NFT details available</div>;

  return (
    <>
      <Navbar />
      <NftDetails details={nftDetails} />
    </>
  );
};

export default NftDetailsPage;
