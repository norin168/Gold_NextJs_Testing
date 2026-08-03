import type { BuyStockRecord } from "@/types/buy-stock";

export const buyStockRecords: BuyStockRecord[] = [
  {
    id: 1,
    type: "buy",
    goldType: "buy",
    weight: 1000,
    purify: 9999,
    price: 9000,
    currency: "USD",
    date: "2026-07-20",
  },
  {
    id: 2,
    type: "buy",
    goldType: "existing",
    weight: 500,
    purify: 50,
    price: 2250,
    currency: "USD",
    date: "2026-07-22",
  },
  {
    id: 3,
    type: "stock",
    weight: 200,
    purify: 9999,
    date: "2026-07-25",
  },
];
