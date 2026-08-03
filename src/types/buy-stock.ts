export type Currency = "USD" | "KHR";

export type GoldType = "buy" | "existing";

export interface BuyStockRecord {
  id: number;
  type: "buy" | "stock";
  goldType?: GoldType; // only set when type === "buy"
  weight: number; // លី
  purify: number; // %
  price?: number; // only set when type === "buy"
  currency?: Currency;
  date: string; // ISO date
}
