import Image from "next/image";
import Link from "next/link";
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Phase 1: mockup only, no real authentication.
 */
export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/background/login_background.png`}
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Darken + tint the photo so the glass card reads clearly at any theme */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/40 to-slate-900/20" />
      <div className="absolute inset-0 bg-indigo-950/10" />

      <Card className="relative w-full max-w-sm border-white/45 bg-white/25 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-inner ring-1 ring-white/30">
            <LineChart className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
            Testing NextJS
          </CardTitle>
          <CardDescription className="text-sm font-normal text-white/70">
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-white/90"
              >
                Username
              </Label>
              <Input
                id="username"
                placeholder="admin"
                autoComplete="username"
                className="border-white/30 bg-white/15 text-white placeholder:text-white/50 focus-visible:ring-white/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white/90"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="border-white/30 bg-white/15 text-white placeholder:text-white/50 focus-visible:ring-white/50"
              />
            </div>
            <Button
              asChild
              className="mt-2 w-full bg-white font-medium text-slate-900 hover:bg-white/90"
            >
              <Link href="/buy-stock">Login</Link>
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-white/50">
            Mockup only — no real authentication yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
