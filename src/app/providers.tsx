"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { TRPCReactProvider } from "~/trpc/react";

import { config } from "../wagmi";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TRPCReactProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </TRPCReactProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
