import { http, createConfig } from "wagmi";
import { arbitrumSepolia, mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [arbitrumSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http(
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
