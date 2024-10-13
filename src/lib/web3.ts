import Web3 from "web3";
import { TransactionConfig } from "web3-core";
import { getEnvVar } from "./env";

export async function sendEvmRawTransaction(rawTransaction: TransactionConfig) {
  // configure web3
  const web3 = new Web3(
    "https://arbitrum-mainnet.infura.io/v3/9c923f4f0b0a4278bb83849196a5cdf8"
  );
  const account = web3.eth.accounts.privateKeyToAccount(
    process.env.NEXT_PUBLIC_LOL!
  );
  web3.eth.accounts.wallet.add(account);

  if (rawTransaction.from === undefined) {
    throw Error("rawTransaction.from is undefined");
  }
  const gasLimit = await web3.eth.estimateGas(rawTransaction);
  const gasPrice = await web3.eth.getGasPrice();

  //   console.log("Gas limit", gasLimit);
  //   console.log("Gas Price", gasPrice);

  const signedTx = await account.signTransaction({
    ...rawTransaction,
    gas: gasLimit,
    gasPrice: gasPrice,
    chain: "sepolia",
  });
  if (signedTx.rawTransaction === undefined) {
    throw Error("signedTx.rawTransaction is undefined");
  }
  console.log("Sending transaction", signedTx.transactionHash);
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}
