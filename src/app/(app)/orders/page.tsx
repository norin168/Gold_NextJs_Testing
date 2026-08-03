import { OrderForm } from "@/features/orders/order-form";
import { OrdersReport } from "@/features/orders/report";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Record customer buy and sell orders, then review the combined
          report below.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderForm type="buy" />
        <OrderForm type="sell" />
      </div>
      <OrdersReport />
    </div>
  );
}
