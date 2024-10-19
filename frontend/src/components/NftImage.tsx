type NftImageProps = {
  imageUrl: string;
};

const NftImage: React.FC<NftImageProps> = ({ imageUrl }) => {
  const httpImageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

  if (!httpImageUrl) {
    return <p>Immagine non disponibile</p>;
  }

  return (
    <img
      src={httpImageUrl}
      alt="NFT Image"
      width="200"
      className="rounded-xl mb-3"
    />
  );
};

export default NftImage;
