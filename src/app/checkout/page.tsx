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
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios";
import processTransaction from "@/lib/bridge";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";

export default function CardsPaymentMethod() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [toAddress, setToAddress] = useState(
    "GDRN7CGVLG5SVYUXXZO3SXTU425HMTE7THN4QCZAPL6LZKNINR76OZ3N"
  );
  const [tokenAmount, setTokenAmount] = useState(
    searchParams.get("tokenAmount") ?? 0.05
  );
  const [receivingChain, setReceivingChain] = useState("Arbitrum");
  const [trackingId, setTrackingId] = useState<null | string>(
    searchParams.get("trackingId") ?? null
  );

  const [mode, setMode] = useState("usdc");

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  async function handlePayment() {
    try {
      setIsPaymentProcessing(true);

      const txReceipt = await processTransaction({
        amount: tokenAmount.toString(),
        to: toAddress,
        from: "0xBe1113a214CA8057C7cD2609Adab905978FBDc6d",
      });

      await axiosInstance.patch(`/bridge/${trackingId}`, {
        data: txReceipt.transactionHash,
      });

      toast({
        title: "Payment successful.",
      });
    } catch (err) {
      console.log(err);

      toast({
        title: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsPaymentProcessing(false);
    }
  }

  const [clientToken, setClientToken] = useState<string | null>(null);
  const [dropinInstance, setDropinInstance] = useState<Dropin | null>(null);

  const [fiatAmount, setFiatAmount] = useState(0);
  const [stellarHash, setStellarHash] = useState<null | string>(null);

  useEffect(() => {
    async function initDropIn() {
      if (!clientToken) return;

      const dropinInstance = await dropin.create({
        authorization: clientToken,
        container: "#dropin-container-div",
        paypal: {
          flow: "checkout",
          currency: "INR",
        },
      });

      setDropinInstance(dropinInstance);
    }

    initDropIn();
  }, [clientToken]);

  async function handlePaypalPayment() {
    if (!dropinInstance) return;

    try {
      setIsPaymentProcessing(true);

      if (fiatAmount <= 0 || fiatAmount > 0.5) {
        toast({
          title: "Invalid amount",
          variant: "destructive",
          description:
            "For testing purposes, we have restricted the amount between 0.01-0.5",
        });

        return;
      }

      if (!toAddress) {
        toast({
          title: "Invalid address",
          variant: "destructive",
          description: "Please enter a valid address",
        });

        return;
      }

      const paymentPayload = await dropinInstance.requestPaymentMethod();

      const { nonce } = paymentPayload;

      const payload = {
        nonce,
        toAddress: toAddress,
        tokenAmount,
        trackingId,
      };

      const res = await axiosInstance.post("/paypal/checkout", payload);

      const data = res.data as {
        message: string;
        id: string;
        txHash: string;
        gatewayId: string;
      };

      setStellarHash(data.txHash);

      toast({
        title: data.message,
        description: `Transaction Hash: ${data.txHash}`,
      });

      // router.replace(`/dashboard/transactions`);
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsPaymentProcessing(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-x-auto p-4">
      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Make payment</CardTitle>
          <CardDescription>
            Please pay using one of the following.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <RadioGroup
            defaultValue="card"
            className="grid grid-cols-3 gap-4"
            onChange={(e) => {
              console.log(e.currentTarget.nodeValue);
            }}
            onValueChange={(val) => {
              setMode(val);
            }}
          >
            <div>
              <RadioGroupItem
                value="usdc"
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
                USDC
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
                value="xlm"
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

          {mode === "usdc" && (
            <>
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
                <Input
                  id="city"
                  placeholder="0x123..."
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="number">Amount</Label>
                <Input
                  id="number"
                  placeholder="Amount in USDC"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(parseFloat(e.target.value))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  defaultValue="user@gmail.com"
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </div>
            </>
          )}

          {mode === "paypal" && <>{!clientToken && <p>Loading...</p>}</>}

          {mode === "paypal" && clientToken && (
            <div id="dropin-container-div"></div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePayment}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
