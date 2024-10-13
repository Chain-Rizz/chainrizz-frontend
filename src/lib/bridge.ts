import {
  AllbridgeCoreSdk,
  ChainSymbol,
  Messenger,
  nodeRpcUrlsDefault,
  RawEvmTransaction,
} from "@allbridge/bridge-core-sdk";

import { sendEvmRawTransaction } from "@/lib/web3";
import { ensure } from "@/lib/utils";

export default async function processTransaction({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) {
  const fromAddress = from; // sender address
  const toAddress = to; // recipient address

  const sdk = new AllbridgeCoreSdk({
    ...nodeRpcUrlsDefault,
    ARB: process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL!,
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

    const approveTxReceipt = await sendEvmRawTransaction(rawTransactionApprove);

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

  return txReceipt;
}
