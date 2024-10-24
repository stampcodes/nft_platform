import usePurchaseNft from "../../hooks/usePurchaseNft";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";

type PurchaseButtonProps = {
  tokenId: bigint;
  price: bigint;
};

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ tokenId, price }) => {
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  const [showError, setShowError] = useState<boolean>(false);

  const { handlePurchaseNft, error, isPending, isConfirming, isConfirmed } =
    usePurchaseNft(tokenId, price);

  const handleClick = async (e: any) => {
    if (!isConnected) {
      await open();
    }
    handlePurchaseNft(e);
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {!isConfirming && !isConfirmed && (
        <button
          disabled={isPending}
          className="customButton mt-5"
          onClick={handleClick}
        >
          {isPending ? "Transaction in Progress..." : "Purchase NFT"}
        </button>
      )}
      {showError && (
        <p className="failedPayment">Payment failed. Please try again.</p>
      )}
      {isConfirming && (
        <div className="waitingPayment">
          Transaction submitted. Waiting for confirmation...
        </div>
      )}
      {isConfirmed && (
        <p className="successfulPayment">Thank you for your purchase.</p>
      )}
    </>
  );
};

export default PurchaseButton;
