import { create } from "zustand";
import { buyStockRecords } from "@/mock/buy-stock";
import type { BuyStockRecord } from "@/types/buy-stock";

interface BuyStockStore {
  records: BuyStockRecord[];
  addRecord: (record: Omit<BuyStockRecord, "id">) => void;
  deleteRecord: (id: number) => void;
}

export const useBuyStockStore = create<BuyStockStore>((set) => ({
  records: buyStockRecords,
  addRecord: (record) =>
    set((state) => ({
      records: [
        ...state.records,
        { ...record, id: state.records.length + 1 },
      ],
    })),
  deleteRecord: (id) =>
    set((state) => ({
      records: state.records.filter((r) => r.id !== id),
    })),
}));
