type NftNameProps = {
  name: string;
};

const NftName: React.FC<NftNameProps> = ({ name }) => {
  return <h2 className="text-white">{name}</h2>;
};

export default NftName;
