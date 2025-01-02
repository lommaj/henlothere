import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "henlothere",
  projectId: "c5a550152027f6684f7ca36d4da9dda2",
  chains: [
    mainnet,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
