import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, sepolia } from "@reown/appkit/networks";

const queryClient = new QueryClient();

const projectId =
  (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string) || "";

const metadata = {
  name: "Quantum Mad Labs",
  description: "Quantum Mad Labs",
  url: "https://reown.com/appkit",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const networks = [sepolia, mainnet];
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia, mainnet],
  projectId,
  metadata,
  features: {
    analytics: true,
  },
  themeVariables: {
    "--w3m-accent": "#2c2c2c",
    "--w3m-color-mix": "#01ef03",
    "--w3m-color-mix-strength": 30,
    "--w3m-font-family": "Poppins-Regular, sans-serif",
    "--w3m-font-size-master": "11px",
    "--w3m-border-radius-master": "2px",
  },
});

interface AppKitProviderProps {
  children: ReactNode;
}

export function AppKitProvider({ children }: AppKitProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
