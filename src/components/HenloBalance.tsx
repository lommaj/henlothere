"use client";

import { useAccount } from "wagmi";
import { api } from "~/trpc/react";
import { WithdrawDialog } from "./WithdrawDialog";

export function HenloBalance() {
  const { address, isConnected } = useAccount();

  const { data: balanceData, isLoading } = api.token.getHenloBalance.useQuery(
    { address: address ?? "0x0" },
    { enabled: isConnected && !!address },
  );

  if (!isConnected) return null;
  if (isLoading) return <div>Loading balance...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl">
        <span className="font-bold">HENLO Balance:</span>{" "}
        {balanceData?.formatted ?? "0 HENLO"}
      </div>
      <WithdrawDialog />
    </div>
  );
}
