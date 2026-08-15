export type Currency = "USD" | "KHR";

export type RecordType = "buy" | "stock";

export interface BuyStockRecord {
  id: number;
  type: RecordType;
  weight: number; // លី
  purify: number; // %
  price: number;
  currency: Currency;
  date: string; // ISO date or datetime-local (YYYY-MM-DDTHH:mm)
}
