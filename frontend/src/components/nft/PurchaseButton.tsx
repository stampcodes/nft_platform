import usePurchaseNft from "../../hooks/usePurchaseNft";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

type PurchaseButtonProps = {
  tokenId: bigint;
  price: bigint;
};

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ tokenId, price }) => {
  const { address } = useAccount();
  const { open } = useAppKit();

  const { handlePurchaseNft, error, isPending, isConfirming, isConfirmed } =
    usePurchaseNft(tokenId, price);

  const handleClick = async (e: any) => {
    if (!address) {
      await open();
    }
    handlePurchaseNft(e);
  };

  return (
    <>
      {!isConfirming && !isConfirmed && (
        <button
          disabled={isPending}
          className="customButton mt-5"
          onClick={handleClick}
        >
          {isPending ? "Confirming..." : "Purchase NFT"}
        </button>
      )}

      {isConfirmed && (
        <p className="successfulPayment">Thank you for your purchase.</p>
      )}
      {error && (
        <p className="failedPayment">Payment failed. Please try again.</p>
      )}
      {isConfirming && (
        <div className="waitingPayment">Waiting for confirmation...</div>
      )}
    </>
  );
};

export default PurchaseButton;
