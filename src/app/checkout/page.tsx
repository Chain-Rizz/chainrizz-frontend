"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CardsPaymentMethod() {
  return (
    <div className="flex items-center justify-center h-screen overflow-x-auto p-4">
      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem
                value="card"
                id="card"
                className="peer sr-only"
                aria-label="Card"
              />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mb-3 h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                Card
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
                aria-label="Paypal"
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.Home className="mb-3 h-6 w-6" />
                Paypal
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="apple"
                id="apple"
                className="peer sr-only"
                aria-label="Apple"
              />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.moon className="mb-3 h-6 w-6" />
                XLM
              </Label>
            </div>
          </RadioGroup>

          <div className="grid gap-2">
            <Label htmlFor="month">Chain</Label>
            <Select defaultValue="1">
              <SelectTrigger id="month" aria-label="Month">
                <SelectValue placeholder="Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Arbitrum</SelectItem>
                <SelectItem value="2">Etereum</SelectItem>
                <SelectItem value="3">Polygon</SelectItem>
                <SelectItem value="4">Base</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">Receipent Address</Label>
            <Input id="city" placeholder="0x123..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Amount</Label>
            <Input id="number" placeholder="Amount in USDC" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              defaultValue="user@gmail.com"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
