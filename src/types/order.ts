import type { Currency } from "./buy-stock";

export type OrderType = "buy" | "sell";

export type PaymentMethod = "Cash" | "ABA" | "ACLEDA";

export interface OrderRecord {
  id: number;
  type: OrderType;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  shopName: string;
  weight: number; // លី
  purify: number; // %, 9999 = 100% gold
  odds: number; // base market price, USD
  price: number; // calculated from odds, weight, purify
  deposit: number;
  depositCurrency: Currency;
  paymentMethod: PaymentMethod;
  date: string; // ISO date
}

/**
 * Purify 9999 = full/100% gold, no division by 100.
 */
export function calculateOrderPrice(
  odds: number,
  weight: number,
  purify: number
): number {
  if (purify === 9999) {
    return (weight / 1000) * odds;
  }
  return (weight / 1000) * (purify / 100) * odds;
}
