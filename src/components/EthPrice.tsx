"use client";

import { useEthPrice } from "~/context/EthPriceContext";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function EthPrice() {
  const { price, isRealPrice, togglePriceSource } = useEthPrice();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-4 shadow-sm">
      <div className="text-2xl font-bold">
        ETH Price: {formatter.format(price)}
      </div>
      <div className="text-sm text-gray-500">
        Using {isRealPrice ? "real" : "simulated"} price updates
      </div>
      <button
        onClick={togglePriceSource}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Switch to {isRealPrice ? "simulated" : "real"} price
      </button>
    </div>
  );
}
