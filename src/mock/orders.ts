import { calculateOrderPrice } from "@/types/order";
import type { OrderRecord } from "@/types/order";

export const orderRecords: OrderRecord[] = [
  {
    id: 1,
    type: "buy",
    customerName: "Sok Dara",
    customerPhone: "012 345 678",
    customerAddress: "Phnom Penh",
    shopName: "Gold Shop A",
    weight: 1000,
    purify: 9999,
    odds: 9000,
    price: calculateOrderPrice(9000, 1000, 9999),
    deposit: 500,
    depositCurrency: "USD",
    paymentMethod: "ABA",
    date: "2026-07-28",
  },
  {
    id: 2,
    type: "sell",
    customerName: "Chan Vuthy",
    customerPhone: "098 765 432",
    customerAddress: "Siem Reap",
    shopName: "Gold Shop B",
    weight: 500,
    purify: 30,
    odds: 9000,
    price: calculateOrderPrice(9000, 500, 30),
    deposit: 200,
    depositCurrency: "KHR",
    paymentMethod: "Cash",
    date: "2026-07-30",
  },
];
