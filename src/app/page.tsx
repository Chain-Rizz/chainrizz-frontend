"use client";

import { Button } from "@/components/ui/button";

import {
  AllbridgeCoreSdk,
  ChainSymbol,
  Messenger,
  nodeRpcUrlsDefault,
  RawEvmTransaction,
} from "@allbridge/bridge-core-sdk";
import Web3 from "web3";

import { getEnvVar } from "@/lib/env";
import { sendEvmRawTransaction } from "@/lib/web3";
import { ensure } from "@/lib/utils";

export default function Home() {
  async function onClick(from: string, to: string, amount: string) {
    const fromAddress = to; // sender address
    const toAddress = to; // recipient address

    const sdk = new AllbridgeCoreSdk({
      ...nodeRpcUrlsDefault,
      // ETH: getEnvVar("WEB3_PROVIDER_URL"),
      ARB: "https://arbitrum-mainnet.infura.io/v3/9c923f4f0b0a4278bb83849196a5cdf8",
    });

    const chains = await sdk.chainDetailsMap();

    const sourceChain = chains[ChainSymbol.ARB];
    const sourceToken = ensure(
      sourceChain.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC")
    );

    const destinationChain = chains[ChainSymbol.SRB];
    const destinationToken = ensure(
      destinationChain.tokens.find((tokenInfo) => tokenInfo.symbol === "USDC")
    );

    //check if sending tokens already approved
    if (
      !(await sdk.bridge.checkAllowance({
        token: sourceToken,
        owner: fromAddress,
        amount: amount,
      }))
    ) {
      console.log("Approving tokens");

      // authorize the bridge to transfer tokens from sender's address
      const rawTransactionApprove = (await sdk.bridge.rawTxBuilder.approve({
        token: sourceToken,
        owner: fromAddress,
      })) as RawEvmTransaction;

      console.log("Approve tx:", rawTransactionApprove);

      const approveTxReceipt = await sendEvmRawTransaction(
        rawTransactionApprove
      );

      console.log("Approve tx id:", approveTxReceipt.transactionHash);
    }

    // initiate transfer
    const rawTransactionTransfer = (await sdk.bridge.rawTxBuilder.send({
      amount: amount,
      fromAccountAddress: fromAddress,
      toAccountAddress: toAddress,
      sourceToken: sourceToken,
      destinationToken: destinationToken,
      messenger: Messenger.ALLBRIDGE,
    })) as RawEvmTransaction;
    console.log(`Sending ${amount} ${sourceToken.symbol}`);
    const txReceipt = await sendEvmRawTransaction(rawTransactionTransfer);
    console.log("tx id:", txReceipt);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button onClick={onClick}>Test</Button>
      </main>
    </div>
  );
}
