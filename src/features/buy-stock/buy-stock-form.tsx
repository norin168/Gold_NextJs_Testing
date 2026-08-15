"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useBuyStockStore } from "@/stores/buy-stock-store";
import type { RecordType, Currency } from "@/types/buy-stock";
import { nowForDateTimeInput } from "@/lib/utils";

const schema = z.object({
  type: z.enum(["buy", "stock"]),
  price: z.coerce.number().positive("Price must be greater than 0"),
  currency: z.enum(["USD", "KHR"]),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  purify: z.coerce.number().min(0).max(9999),
  date: z.string().min(1, "Date is required"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function BuyStockForm() {
  const addRecord = useBuyStockStore((s) => s.addRecord);
  const [type, setType] = useState<RecordType>("buy");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "buy",
      currency: "USD",
      purify: 9999,
      date: nowForDateTimeInput(),
    },
  });

  function onSubmit(values: FormValues) {
    addRecord({
      type: values.type,
      weight: values.weight,
      purify: values.purify,
      price: values.price,
      currency: values.currency,
      date: values.date,
    });
    toast.success("Report saved");
    reset({
      type: values.type,
      currency: "USD",
      purify: 9999,
      date: nowForDateTimeInput(),
    });
  }

  return (
    <Card className="border-amber-200/60 dark:border-amber-900/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            <Coins className="size-4" />
          </span>
          Buy & Stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Label>Type</Label>
            <Select
              defaultValue="buy"
              onValueChange={(value: RecordType) => {
                setType(value);
                setValue("type", value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy (ទិញមាស)</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="any"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="flex w-28 flex-col gap-2">
              <Label>Currency</Label>
              <Select
                defaultValue="USD"
                onValueChange={(value: Currency) => setValue("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="KHR">KHR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="weight">Weight (លី)</Label>
            <Input
              id="weight"
              type="number"
              step="any"
              {...register("weight")}
            />
            {errors.weight && (
              <p className="text-sm text-destructive">
                {errors.weight.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="purify">Purify (%)</Label>
            <Input
              id="purify"
              type="number"
              step="any"
              {...register("purify")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="date">{type === "buy" ? "Date" : "Date Stock"}</Label>
            <Input id="date" type="datetime-local" {...register("date")} />
            {errors.date && (
              <p className="text-sm text-destructive">
                {errors.date.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Save Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
