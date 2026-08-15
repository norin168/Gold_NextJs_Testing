import { BuyStockForm } from "@/features/buy-stock/buy-stock-form";
import { BuyStockReport } from "@/features/buy-stock/report";

export default function BuyStockPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Buy & Stock</h1>
        <p className="text-sm text-muted-foreground">
          Record gold purchases and stock intake, then review the combined
          report below.
        </p>
      </div>
      <BuyStockForm />
      <BuyStockReport />
    </div>
  );
}
