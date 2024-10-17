type NftNameProps = {
  name: string;
  tokenId: bigint;
};

const NftName: React.FC<NftNameProps> = ({ name, tokenId }) => {
  return (
    <h2>
      {name} (ID: {`Token ID: ${tokenId}`})
    </h2>
  );
};

export default NftName;
