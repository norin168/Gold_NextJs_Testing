"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrdersStore } from "@/stores/orders-store";
import { calculateOrderPrice } from "@/types/order";
import type { OrderType, PaymentMethod } from "@/types/order";
import type { Currency } from "@/types/buy-stock";
import { nowForDateTimeInput } from "@/lib/utils";

const schema = z.object({
  type: z.enum(["buy", "sell"]),
  customerName: z.string().min(1, "Name is required"),
  customerPhone: z.string().min(1, "Phone is required"),
  customerAddress: z.string().min(1, "Address is required"),
  shopName: z.string().min(1, "Shop name is required"),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  purify: z.coerce.number().min(0).max(9999),
  odds: z.coerce.number().positive("Odds must be greater than 0"),
  deposit: z.coerce.number().min(0),
  depositCurrency: z.enum(["USD", "KHR"]),
  paymentMethod: z.enum(["Cash", "ABA", "ACLEDA"]),
  date: z.string().min(1, "Date is required"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function OrderForm() {
  const addRecord = useOrdersStore((s) => s.addRecord);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "buy",
      purify: 9999,
      depositCurrency: "USD",
      paymentMethod: "Cash",
      date: nowForDateTimeInput(),
    },
  });

  const type = useWatch({ control, name: "type" });
  const weight = useWatch({ control, name: "weight" });
  const purify = useWatch({ control, name: "purify" });
  const odds = useWatch({ control, name: "odds" });

  const price =
    weight && purify !== undefined && odds
      ? calculateOrderPrice(Number(odds), Number(weight), Number(purify))
      : 0;

  function onSubmit(values: FormValues) {
    addRecord({
      type: values.type,
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      customerAddress: values.customerAddress,
      shopName: values.shopName,
      weight: values.weight,
      purify: values.purify,
      odds: values.odds,
      price: calculateOrderPrice(values.odds, values.weight, values.purify),
      deposit: values.deposit,
      depositCurrency: values.depositCurrency,
      paymentMethod: values.paymentMethod,
      date: values.date,
    });
    toast.success(
      `Customer Order ${values.type === "buy" ? "Buy" : "Sell"} report saved`,
    );
    reset({
      type: values.type,
      purify: 9999,
      depositCurrency: "USD",
      paymentMethod: "Cash",
      date: nowForDateTimeInput(),
    });
  }

  const prefix = "order";
  const isBuy = type === "buy";

  return (
    <Card
      className={
        isBuy
          ? "border-emerald-200/60 dark:border-emerald-900/40"
          : "border-rose-200/60 dark:border-rose-900/40"
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span
            className={
              isBuy
                ? "flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                : "flex size-8 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
            }
          >
            {isBuy ? (
              <ArrowDownCircle className="size-4" />
            ) : (
              <ArrowUpCircle className="size-4" />
            )}
          </span>
          Customer Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <p className="text-sm font-medium text-muted-foreground">
            Customer Information
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-name`}>Name</Label>
              <Input id={`${prefix}-name`} {...register("customerName")} />
              {errors.customerName && (
                <p className="text-sm text-destructive">
                  {errors.customerName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-phone`}>Phone</Label>
              <Input id={`${prefix}-phone`} {...register("customerPhone")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-address`}>Address</Label>
              <Input
                id={`${prefix}-address`}
                {...register("customerAddress")}
              />
            </div>
          </div>

          <Separator />
          <p className="text-sm font-medium text-muted-foreground">
            Order Information
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select
                defaultValue="buy"
                onValueChange={(v: OrderType) => setValue("type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Order Buy</SelectItem>
                  <SelectItem value="sell">Order Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-shop`}>Shop Name</Label>
              <Input id={`${prefix}-shop`} {...register("shopName")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-odds`}>Odds (USD)</Label>
              <Input
                id={`${prefix}-odds`}
                type="number"
                step="any"
                {...register("odds")}
              />
              {errors.odds && (
                <p className="text-sm text-destructive">
                  {errors.odds.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-weight`}>Weight (លី)</Label>
              <Input
                id={`${prefix}-weight`}
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
              <Label htmlFor={`${prefix}-purify`}>Purify (%)</Label>
              <Input
                id={`${prefix}-purify`}
                type="number"
                step="any"
                {...register("purify")}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={`${prefix}-deposit`}>Deposit</Label>
                <Input
                  id={`${prefix}-deposit`}
                  type="number"
                  step="any"
                  {...register("deposit")}
                />
              </div>
              <div className="flex w-24 flex-col gap-2">
                <Label>Currency</Label>
                <Select
                  defaultValue="USD"
                  onValueChange={(v: Currency) =>
                    setValue("depositCurrency", v)
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
            <div className="flex flex-col gap-2">
              <Label>Payment Method</Label>
              <Select
                defaultValue="Cash"
                onValueChange={(v: PaymentMethod) =>
                  setValue("paymentMethod", v)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="ABA">ABA</SelectItem>
                  <SelectItem value="ACLEDA">ACLEDA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${prefix}-date`}>Date Order</Label>
              <Input
                id={`${prefix}-date`}
                type="datetime-local"
                {...register("date")}
              />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          <Separator />
          <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3">
            <span className="text-sm font-medium">Price</span>
            <span className="text-lg font-semibold">
              ${price ? price.toFixed(2) : "0.00"}
            </span>
          </div>

          <Button type="submit" className="w-full sm:w-auto sm:self-end">
            Save Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
