export const HENLO_TOKEN_ADDRESS = "0x23a96680ccde03bd4bdd9a3e9a0cb56a5d27f7c9";
export const HENLO_TOKEN_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
] as const;
