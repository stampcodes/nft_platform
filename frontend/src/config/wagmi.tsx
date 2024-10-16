import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId =
  (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string) || "";

const metadata = {
  name: "Quantum Mad Labs",
  description: "AppKit Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeVariables: {
    "--w3m-accent": "#2c2c2c",
    "--w3m-color-mix": "#01ef03",
    "--w3m-color-mix-strength": 30,
    "--w3m-font-family": "Poppins-Regular, sans-serif",
    "--w3m-font-size-master": "11px",
    "--w3m-border-radius-master": "2px",
  },
});

interface Web3ModalProviderProps {
  children: ReactNode;
}

export function Web3ModalProvider({ children }: Web3ModalProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
