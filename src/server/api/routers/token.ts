import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createPublicClient, http, formatUnits } from "viem";
import { base } from "wagmi/chains";
import { HENLO_TOKEN_ADDRESS, HENLO_TOKEN_ABI } from "~/constants/contracts";

const client = createPublicClient({
  chain: base,
  transport: http(),
});

export const tokenRouter = createTRPCRouter({
  getHenloBalance: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      try {
        const balance = await client.readContract({
          address: HENLO_TOKEN_ADDRESS,
          abi: HENLO_TOKEN_ABI,
          functionName: "balanceOf",
          args: [input.address],
        });

        return {
          balance: formatUnits(balance as bigint, 18),
          formatted: `${Number(formatUnits(balance as bigint, 18)).toFixed(2)} HENLO`,
        };
      } catch (error) {
        console.error("Error fetching HENLO balance:", error);
        return {
          balance: "0",
          formatted: "0 HENLO",
        };
      }
    }),
});
