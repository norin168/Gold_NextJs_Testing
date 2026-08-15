"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Printer, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrdersStore } from "@/stores/orders-store";
import { formatRecordDate } from "@/lib/utils";

type TypeFilter = "all" | "buy" | "sell";

function formatDeposit(amount: number, currency: "USD" | "KHR") {
  if (currency === "KHR") {
    return `${amount.toLocaleString()}៛`;
  }
  return `$${amount}`;
}

export function OrdersReport() {
  const records = useOrdersStore((s) => s.records);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      if (
        search &&
        !r.customerName.toLowerCase().includes(search.toLowerCase()) &&
        !String(r.id).includes(search)
      )
        return false;
      return true;
    });
  }, [records, typeFilter, dateFrom, dateTo, search]);

  const totalsSource = selectedId
    ? filtered.filter((r) => r.id === selectedId)
    : filtered;

  const totalWeightSell = totalsSource
    .filter((r) => r.type === "sell")
    .reduce((sum, r) => sum + r.weight, 0);
  const totalWeightBuy = totalsSource
    .filter((r) => r.type === "buy")
    .reduce((sum, r) => sum + r.weight, 0);

  const depositUsd = (method: string) =>
    totalsSource
      .filter((r) => r.paymentMethod === method && r.depositCurrency === "USD")
      .reduce((sum, r) => sum + r.deposit, 0);
  const depositKhr = (method: string) =>
    totalsSource
      .filter((r) => r.paymentMethod === method && r.depositCurrency === "KHR")
      .reduce((sum, r) => sum + r.deposit, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="size-4 text-muted-foreground" />
          Report
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-muted/30 p-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Search</span>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or No"
              className="w-48 bg-background"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Type</span>
            <Select
              value={typeFilter}
              onValueChange={(v: TypeFilter) => setTypeFilter(v)}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="buy">Order Buy</SelectItem>
                <SelectItem value="sell">Order Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">From</span>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">To</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="sticky top-0 z-10 bg-background">
                  <TableHead>No</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Shop</TableHead>
                  <TableHead>Weight (លី)</TableHead>
                  <TableHead>Purify (%)</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow
                    key={r.id}
                    data-state={selectedId === r.id ? "selected" : undefined}
                    className="cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-primary/10"
                    onClick={() =>
                      setSelectedId(selectedId === r.id ? null : r.id)
                    }
                  >
                    <TableCell>{r.id}</TableCell>
                    <TableCell className="capitalize">
                      Order {r.type}
                    </TableCell>
                    <TableCell>
                      {r.customerName}
                      <div className="text-xs text-muted-foreground">
                        {r.customerPhone} · {r.customerAddress}
                      </div>
                    </TableCell>
                    <TableCell>{r.shopName}</TableCell>
                    <TableCell>{r.weight}</TableCell>
                    <TableCell>{r.purify}</TableCell>
                    <TableCell>${r.odds}</TableCell>
                    <TableCell>
                      ${r.price.toFixed(2)}
                      {r.depositCurrency === "KHR" && (
                        <div className="text-xs text-muted-foreground">
                          {formatDeposit(r.price * 4000, "KHR")}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDeposit(r.deposit, r.depositCurrency)} (
                      {r.paymentMethod})
                    </TableCell>
                    <TableCell>{formatRecordDate(r.date)}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <SearchX className="size-6" />
                        <span>No records found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Total {selectedId ? `(No. ${selectedId})` : ""}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Weight
                </p>
                <div className="flex justify-between text-sm">
                  <span>Sell (Customer Booked)</span>
                  <span>{totalWeightSell} លី</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Buy (Customer Booked)</span>
                  <span>{totalWeightBuy} លី</span>
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Deposit
                </p>
                {(["Cash", "ABA", "ACLEDA"] as const).map((method) => (
                  <div key={method} className="flex justify-between text-sm">
                    <span>Total {method}</span>
                    <span>
                      ${depositUsd(method)}
                      {depositKhr(method) > 0 && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({depositKhr(method).toLocaleString()}៛)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => window.print()}
              >
                <Printer /> Print
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
