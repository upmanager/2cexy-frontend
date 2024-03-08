//@ts-ignore
import { SafeEventEmitterProvider } from "@web3auth/base";
import ethProvider from "./ethProvider";
import solanaProvider from "./solanaProvider";
import tronProvider from "./tronProvider";
import cosmosProvider from "./cosmosProvider";
import aptosProvider from "./aptosProvider";
import tezosProvider from "./tezosProvider";

export interface IWalletProvider {
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  signAndSendTransaction: () => Promise<void>;
  signTransaction: () => Promise<void>;
  signMessage: () => Promise<void>;
}

export const getWalletProvider = (
  chain: string,
  provider: SafeEventEmitterProvider,
  uiConsole: any
): IWalletProvider => {
  console.log("chain ------ >>>>>>>>> ", chain);

  if (chain === "solana") {
    return solanaProvider(provider, uiConsole);
  } else if (chain === "tron") {
    return tronProvider(provider, uiConsole);
  } else if (chain === "cosmos" || chain === "osmo" || chain === "juno") {
    return cosmosProvider(provider, uiConsole, chain);
  } else if (chain === "aptos") {
    return aptosProvider(provider, uiConsole);
  } else if (chain === "tezos") {
    return tezosProvider(provider, uiConsole);
  } else {
    return ethProvider(provider, uiConsole);
  }
};
