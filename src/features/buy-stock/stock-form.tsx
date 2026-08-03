"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBuyStockStore } from "@/stores/buy-stock-store";

const schema = z.object({
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  purify: z.coerce.number().min(0).max(9999),
  date: z.string().min(1, "Date is required"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function StockForm() {
  const addRecord = useBuyStockStore((s) => s.addRecord);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    addRecord({
      type: "stock",
      weight: values.weight,
      purify: values.purify,
      date: values.date,
    });
    toast.success("Stock report saved");
    reset();
  }

  return (
    <Card className="border-sky-200/60 dark:border-sky-900/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
            <Boxes className="size-4" />
          </span>
          Stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="stock-weight">Weight (លី)</Label>
            <Input
              id="stock-weight"
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
            <Label htmlFor="stock-purify">Purify (%)</Label>
            <Input
              id="stock-purify"
              type="number"
              step="any"
              {...register("purify")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="stock-date">Date Stock (ថ្ងៃដាក់ចូល Stock)</Label>
            <Input id="stock-date" type="date" {...register("date")} />
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
