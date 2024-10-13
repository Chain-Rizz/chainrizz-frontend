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
import { QRCodeSVG } from "qrcode.react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SITE_URL } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function ReceivePaymentPage() {
  const router = useRouter();

  const [toAddress, setToAddress] = useState(
    "GDRN7CGVLG5SVYUXXZO3SXTU425HMTE7THN4QCZAPL6LZKNINR76OZ3N"
  );
  const [tokenAmount, setTokenAmount] = useState(0.06);
  const [receivingChain, setReceivingChain] = useState("Stellar");
  const [token, setToken] = useState<"USDC" | "XLM">("USDC");
  const [trackingId, setTrackingId] = useState<null | string>(null);

  const [txHash, setTxHash] = useState<null | string>(null);
  const [qrData, setQrData] = useState<null | string>(null);

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  async function handlePayment() {
    try {
      setIsPaymentProcessing(true);
      const trackingId = uuidv4();

      await axiosInstance.post(`/bridge`, {
        trackingId,
      });

      const data = {
        toAddress,
        tokenAmount,
        receivingChain,
        trackingId,
      };

      const searchParams = new URLSearchParams({
        ...data,
        tokenAmount: tokenAmount.toString(),
      }).toString();

      setQrData(`${SITE_URL}/checkout?${searchParams}`);
      setPaymentUrl(`${SITE_URL}/checkout?${searchParams}`);

      setTrackingId(trackingId);
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

  useEffect(() => {
    if (!trackingId) return;

    const checkStatus = setInterval(async () => {
      try {
        const res = await axiosInstance.get(`/bridge/${trackingId}`);

        const data = res.data as {
          data: string;
          trackingId: string;
          id: string;
          status: string;
          createdAt: Date;
          updatedAt: Date;
        };

        if (data.status === "COMPLETED") {
          clearInterval(checkStatus);
          setTxHash(data.data);

          toast({
            title: "Payment Received",
            description: `Redirecting to the transaction page...`,
          });

          // TODO: Redirect to the transaction page
          // router.replace(`/dashboard/transactions`);
        }
      } catch {
        console.error("Waiting for connection...");
      }
    }, 1000);

    // Add a timeout to stop polling after a certain time
    setTimeout(() => {
      clearInterval(checkStatus);
    }, 1000 * 60);

    return () => {
      clearInterval(checkStatus);
    };
  }, [trackingId, router]);

  return (
    <div className="flex items-center justify-center h-screen overflow-x-auto p-4">
      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Accept Payment</CardTitle>
          <CardDescription>
            Please enter how you would like to receive your payment.
          </CardDescription>
        </CardHeader>

        {qrData && (
          <div className="bg-white w-full mt-8 flex justify-center items-center">
            <QRCodeSVG value={qrData} className="w-full" />

            {paymentUrl && (
              <a href={paymentUrl} target="_blank">
                Payment URL
              </a>
            )}
          </div>
        )}

        <CardContent className="grid gap-6">
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
            <Label htmlFor="month">Token</Label>
            <Select defaultValue="1">
              <SelectTrigger id="month" aria-label="Month">
                <SelectValue placeholder="Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">USDC</SelectItem>
                <SelectItem value="2">XLM</SelectItem>
              </SelectContent>
            </Select>
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
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handlePayment}>
            Continue
          </Button>

          <Alert className="mt-3 w-full">
            <AlertTitle className="font-bold">Tx Hash:</AlertTitle>
            <AlertDescription>
              <Link
                href={`https://arbiscan.io/tx/${txHash}`}
                className="underline break-words"
                target="_blank"
              >
                {txHash}
              </Link>
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}
