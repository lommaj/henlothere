import { createContext, useContext, useEffect, useState } from "react";

interface EthPriceContextType {
  price: number;
  isRealPrice: boolean;
  togglePriceSource: () => void;
}

interface CoinGeckoResponse {
  ethereum: {
    usd: number;
  };
}

const EthPriceContext = createContext<EthPriceContextType | undefined>(
  undefined,
);

export function EthPriceProvider({ children }: { children: React.ReactNode }) {
  const [price, setPrice] = useState(3450);
  const [isRealPrice, setIsRealPrice] = useState(false);

  const togglePriceSource = () => {
    setIsRealPrice((prev) => !prev);
  };

  // Simulated price updates
  useEffect(() => {
    if (!isRealPrice) {
      const interval = setInterval(() => {
        const priceChange = Math.random() * (8 - 3) + 3; // Random number between 3 and 8
        const isIncrease = Math.random() > 0.5;

        setPrice((prevPrice) => {
          return isIncrease ? prevPrice + priceChange : prevPrice - priceChange;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRealPrice]);

  // Real price updates via CoinGecko
  useEffect(() => {
    if (isRealPrice) {
      const fetchRealPrice = async () => {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
          );
          const data = (await response.json()) as CoinGeckoResponse;
          setPrice(data.ethereum.usd);
        } catch (error) {
          console.error("Failed to fetch ETH price:", error);
        }
      };

      void fetchRealPrice();

      const interval = setInterval(() => {
        void fetchRealPrice();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRealPrice]);

  return (
    <EthPriceContext.Provider value={{ price, isRealPrice, togglePriceSource }}>
      {children}
    </EthPriceContext.Provider>
  );
}

export function useEthPrice() {
  const context = useContext(EthPriceContext);
  if (context === undefined) {
    throw new Error("useEthPrice must be used within an EthPriceProvider");
  }
  return context;
}
