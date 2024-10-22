import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NftSaleList from "../components/nft/NftSaleList";
import useGetNftsForSaleWithDetails from "../hooks/useGetNftsForSaleWithDetails";
import loading from "../assets/imgs/loading.gif";
import { Helmet } from "react-helmet-async";

const NftMarketplacePage = () => {
  const { nftsForSaleWithDetails, isPending, error, refetch } =
    useGetNftsForSaleWithDetails();

  useEffect(() => {
    refetch();
  }, []);

  if (isPending)
    return (
      <div className="LoadingIcon">
        <img src={loading} alt="loading..." />
      </div>
    );
  if (error) return <div>Error in loading NFTs: {error.message}</div>;
  if (!nftsForSaleWithDetails) return <div>No NFT available</div>;

  return (
    <>
      <Helmet>
        <title>Quantum Mad Labs - Market</title>
      </Helmet>
      <Navbar />
      <NftSaleList nfts={nftsForSaleWithDetails} />
    </>
  );
};

export default NftMarketplacePage;
