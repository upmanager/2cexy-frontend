import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
//@ts-ignore
import { Web3Provider } from "@ethersproject/providers";
import { ConnectionProvider, WalletProvider as WalletProviderSolana } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { Web3ReactProvider } from '@web3-react/core';

import { useEffect, useState } from "react";
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { Web3AuthProvider } from "../services/web3auth";
//@ts-ignore

import {
  AptosWalletAdapter, BloctoWalletAdapter, FewchaWalletAdapter, FletchWalletAdapter, FoxWalletAdapter, HippoExtensionWalletAdapter, HippoWalletAdapter, MartianWalletAdapter, ONTOWalletAdapter, PontemWalletAdapter, RiseWalletAdapter, SafePalWalletAdapter, SpikaWalletAdapter, TokenPocketWalletAdapter, WalletProvider as WalletProviderAptos
} from '@manahippo/aptos-wallet-adapter';
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  CloverWalletAdapter,
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  StrikeWalletAdapter,
  TrustWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
require('@solana/wallet-adapter-react-ui/styles.css');


//@ts-ignore
function getLibrary(provider) {
  return new Web3Provider(provider);
}

function HomePage() {
  const networkSolana = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(networkSolana), [networkSolana]);

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter(),
      new StrikeWalletAdapter(),
      new GlowWalletAdapter(),
      new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new CloverWalletAdapter(),
      new BraveWalletAdapter(),
    ],
    []
  );

  const aptosWallets = [
    new HippoWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    new PontemWalletAdapter(),
    new SpikaWalletAdapter(),
    new RiseWalletAdapter(),
    new FletchWalletAdapter(),
    new TokenPocketWalletAdapter(),
    new ONTOWalletAdapter(),
    new BloctoWalletAdapter({ bloctoAppId: '6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46' }), /** Must provide bloctoAppId **/
    new SafePalWalletAdapter(),
    new FoxWalletAdapter(),
  ];
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("bsc");
  useEffect(() => {
    console.log(chain);
  }, [chain])
  return (
    //@ts-ignore
    <WalletProviderAptos
      wallets={aptosWallets}
      autoConnect={false} /** allow auto wallet connection or not **/
      onError={(error: Error) => {
        console.log('Handle Error Message', error);
      }}>
      <ConnectionProvider endpoint={endpoint} >
        <WalletProviderSolana wallets={wallets}>
          <WalletModalProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Web3AuthProvider chain={chain} web3AuthNetwork="Mainnet">
                <Routes>
                  <Route path='/' element={<Landing setChain={setChain} />} />
                  <Route path='/privacy' element={<PrivacyPage />} />
                  <Route path='/terms' element={<TermsPage />} />
                </Routes>
              </Web3AuthProvider>
            </Web3ReactProvider>
          </WalletModalProvider>
        </WalletProviderSolana>
      </ConnectionProvider>
    </WalletProviderAptos>
  );
}
export default HomePage;