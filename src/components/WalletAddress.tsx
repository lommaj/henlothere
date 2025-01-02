"use client";

import { useAccount } from "wagmi";

export function WalletAddress() {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) return null;

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="text-lg font-medium text-white/80">
      Connected: {truncatedAddress}
    </div>
  );
}
