import { create } from "zustand";
import { orderRecords } from "@/mock/orders";
import type { OrderRecord } from "@/types/order";

interface OrdersStore {
  records: OrderRecord[];
  addRecord: (record: Omit<OrderRecord, "id">) => void;
  deleteRecord: (id: number) => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  records: orderRecords,
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
