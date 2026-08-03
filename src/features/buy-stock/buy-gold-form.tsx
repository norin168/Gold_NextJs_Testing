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
import type { GoldType, Currency } from "@/types/buy-stock";

const schema = z.object({
  goldType: z.enum(["buy", "existing"]),
  price: z.coerce.number().optional(),
  currency: z.enum(["USD", "KHR"]).optional(),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  purify: z.coerce.number().min(0).max(9999),
  date: z.string().min(1, "Date is required"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function BuyGoldForm() {
  const addRecord = useBuyStockStore((s) => s.addRecord);
  const [goldType, setGoldType] = useState<GoldType>("buy");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { goldType: "buy", currency: "USD" },
  });

  function onSubmit(values: FormValues) {
    addRecord({
      type: "buy",
      goldType: values.goldType,
      weight: values.weight,
      purify: values.purify,
      price: values.goldType === "buy" ? values.price : undefined,
      currency: values.goldType === "buy" ? values.currency : undefined,
      date: values.date,
    });
    toast.success("Buy Gold report saved");
    reset({ goldType: values.goldType, currency: "USD" });
  }

  return (
    <Card className="border-amber-200/60 dark:border-amber-900/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            <Coins className="size-4" />
          </span>
          Buy Gold
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
              onValueChange={(value: GoldType) => {
                setGoldType(value);
                setValue("goldType", value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy (ទិញមាស)</SelectItem>
                <SelectItem value="existing">Existing (មាសស្រាប់)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {goldType === "buy" && (
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="any"
                  {...register("price")}
                />
              </div>
              <div className="flex w-28 flex-col gap-2">
                <Label>Currency</Label>
                <Select
                  defaultValue="USD"
                  onValueChange={(value: Currency) =>
                    setValue("currency", value)
                  }
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
          )}

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
            <Label htmlFor="date">
              {goldType === "buy" ? "Date Purchase" : "Date"}
            </Label>
            <Input id="date" type="date" {...register("date")} />
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
