type NftNameProps = {
  name: string;
};

const NftName: React.FC<NftNameProps> = ({ name }) => {
  return <h2>{name}</h2>;
};

export default NftName;
