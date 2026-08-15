"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Printer, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { useBuyStockStore } from "@/stores/buy-stock-store";
import { formatRecordDate } from "@/lib/utils";

type TypeFilter = "all" | "buy" | "stock";

export function BuyStockReport() {
  const records = useBuyStockStore((s) => s.records);
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
      if (search && !String(r.id).includes(search)) return false;
      return true;
    });
  }, [records, typeFilter, dateFrom, dateTo, search]);

  const totalsSource = selectedId
    ? filtered.filter((r) => r.id === selectedId)
    : filtered;

  const totalWeight = totalsSource.reduce((sum, r) => sum + r.weight, 0);
  const totalPrice = totalsSource.reduce((sum, r) => sum + (r.price ?? 0), 0);

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
            <span className="text-sm text-muted-foreground">Search (No)</span>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by No"
              className="w-40 bg-background"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Type</span>
            <Select
              value={typeFilter}
              onValueChange={(v: TypeFilter) => setTypeFilter(v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="sticky top-0 z-10 bg-background">
                  <TableHead>No</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight (លី)</TableHead>
                  <TableHead>Purify (%)</TableHead>
                  <TableHead>Price</TableHead>
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
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={r.type === "buy" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {r.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.weight}</TableCell>
                    <TableCell>{r.purify}</TableCell>
                    <TableCell>
                      {r.currency} {r.price}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatRecordDate(r.date)}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
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

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base">
                Total {selectedId ? `(No. ${selectedId})` : ""}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Weight</span>
                <span className="font-medium">{totalWeight} លី</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total Price (USD)
                </span>
                <span className="font-medium">${totalPrice}</span>
              </div>
              <Separator />
              <Button
                variant="outline"
                className="mt-1"
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
