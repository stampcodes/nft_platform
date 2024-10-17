type NftDescriptionProps = {
  description: string;
};

const NftDescription: React.FC<NftDescriptionProps> = ({ description }) => {
  return <p>{description}</p>;
};

export default NftDescription;
