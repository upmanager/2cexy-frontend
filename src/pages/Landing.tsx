import { useWallet as useWalletAptos } from "@manahippo/aptos-wallet-adapter";
import detectEthereumProvider from '@metamask/detect-provider';
import type { default as SolWalletAdapter } from '@project-serum/sol-wallet-adapter';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import type { StrikeWallet } from '@strike-protocols/solana-wallet-adapter';
import { validateContractAddress, ValidationResult } from '@taquito/utils';
import { Button, Col, Container, Form, Image, InputGroup, Row } from '@themesberg/react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { init } from 'ityped';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Iframe from 'react-iframe';
import { Bars } from 'react-loader-spinner';
import Modal from 'react-modal';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import Web3 from 'web3';
import LogoImage from '../assets/img/2c_logo_text.png';
import CircleImage from '../assets/img/circle-dashes.svg';
import CoinsImage from '../assets/img/coins.png';
import BinanceImage from '../assets/img/c_logo/binance.png';
import CoinBaseImage from '../assets/img/c_logo/coinbase.png';
import CryptoImage from '../assets/img/c_logo/crypto.png';
import AllImage from '../assets/img/c_logo/generic-cryptocurrency.svg';
import KadoImage from '../assets/img/c_logo/kado.png';
import PerlinImage from '../assets/img/c_logo/perlin.png';
import RampImage from '../assets/img/c_logo/ramp.png';
import GC1Image from '../assets/img/gc1.png';
import GC2Image from '../assets/img/gc2.png';
import GC3Image from '../assets/img/gc3.png';
import GC4Image from '../assets/img/gc4.png';
import CheckBox from '../components/CheckBox';
import Documentation from '../components/Documentation';
import WalletModal from '../components/WalletModal';
import { aptosWallets, cosmosWallets, evmWallets, modalStyles, NETWORKNAMES, networksCustomStyle, NETWORKTYPES, nftMethodsCustomStyle, paymentsCustomStyle, PAYMENTSNAMES, poolAddressCustomStyle, solanaWallets, TABNAMES, tezosWallets } from '../utils/constants';
import { checkEVMAddress, checkEVMContract, convertToTypeOf, getAbi, getParameters, getReadAbleMethodsFromAbi, getSymbol, getWriteAbleMethodsFromAbi } from '../utils/utils';
import { TempleWallet } from "@temple-wallet/dapp";
import { useWeb3Auth } from "../services/web3auth";
import {
  WalletConfigError,
  WalletConnectionError,
  WalletLoadError
} from '@solana/wallet-adapter-base';
//@ts-ignore
import useGeoLocation from "react-ipgeolocation";
AOS.init()

const Landing: FC = (props: any) => {
  const devMode: string = (process.env.REACT_APP_DEV_MODE_CONFIGURATION as string)
  const { addToast } = useToasts()

  //somewhere in your app/component
  const location = useGeoLocation();
  console.log('location', location);
  const { provider: web3authProvider, login, logout, web3Auth } = useWeb3Auth();
  const [inited, setInited] = useState(false)
  const [private_key, setPrivateKey] = useState('')

  // const [isRampPermission, setRampPermission] = useState(false)
  // const [isCoinbasePermission, setCoinbasePermission] = useState(false)
  // const [isKadoPermission, setKadoPermission] = useState(false)



  const [isRampPermission, setRampPermission] = useState(true)
  const [isCoinbasePermission, setCoinbasePermission] = useState(true)
  const [isKadoPermission, setKadoPermission] = useState(true)

  useEffect(() => {
    const myElement: any = document.querySelector('#ityped')
    init(myElement, {
      showCursor: false, strings: ['a Centralized Exchange', 'an Onboarding Ramp', 'an OTC Desk'],
      startDelay: 1200,
      backSpeed: 50,
      backDelay: 1200,
      loop: true
    })
    const myElement1: any = document.querySelector('#ityped2')

    init(myElement1, {
      strings: ['for'],
      startDelay: 400,
      loop: false,
      showCursor: false
    })

  }, [location.country])

  const getPermission = useCallback(async () => {
    let payload = {
      country: location.country
    }

    axios.post("http://api.2cexy.com/check-blacklist", payload)
      .then(res => {
        if (res.data && res.data.status === 200) {
          setRampPermission(res.data.data.Ramp);
          setCoinbasePermission(res.data.data.Coinbase);
          setKadoPermission(res.data.data.Kado);
        }
      }).catch(e => {
        console.error(e)
      })
  }, [location.country])


  useEffect(() => {
    console.log('contry')
    console.log('country', location.country);
    if (location.country !== undefined) {
      getPermission();
    }
  }, [getPermission, location.country])

  useEffect(() => {
    if (inited) {
      if (web3Auth?.status === 'connected') {
        web3authProvider?.getAccounts().then(
          (account) => {
            // console.log('eeee')
            console.log('wallet address==>', account.account[0])
            setHolderAddress(account.account[0]);
            setPrivateKey(account.private_key);
          }
        );
      }
    } else {
      logout();
      setInited(true);
    }
  }, [inited, logout, web3Auth?.status, web3authProvider])

  const showMessage = (message: string) => {
    addToast(message, { appearance: 'error' });
  }
  const getNetWorkLabel = (image: any, name: string) => {
    return <div>
      <Image src={image} width="25px" alt="" />
      <span style={{ marginLeft: "5px" }}>{name}</span>
    </div>
  }
  const networks = [
    {
      value: NETWORKNAMES.BINANCESMARTCHAIN,
      label: getNetWorkLabel(BinanceImage, NETWORKNAMES.BINANCESMARTCHAIN),
      gasToken: 'bnb',
      id: 'binancecoin',
      poolAddress: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      provider: 'https://rpc-bsc.bnb48.club',
      abiUrl: 'https://api.bscscan.com/api?module=contract&action=getabi&address=',
      placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      wallets: evmWallets,
      chain_net: 'bsc',
    },
    {
      value: NETWORKNAMES.ETHEREUM,
      label: getNetWorkLabel('https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png', NETWORKNAMES.ETHEREUM),
      gasToken: 'eth',
      id: 'ethereum',
      poolAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      provider: 'https://rpc.ankr.com/eth',
      abiUrl: 'https://api.etherscan.io/api?module=contract&action=getabi&address=',
      placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      wallets: evmWallets,
      chain_net: 'mainnet'
    },
    {
      value: NETWORKNAMES.POLYGON,
      label: getNetWorkLabel('https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png', NETWORKNAMES.POLYGON),
      gasToken: 'matic',
      id: 'matic-network',
      poolAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
      provider: 'https://rpc.ankr.com/polygon',
      abiUrl: 'https://api.polygonscan.com/api?module=contract&action=getabi&address=',
      placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      wallets: evmWallets,
      chain_net: 'polygon',
    },
    {
      value: NETWORKNAMES.AVALANCHE,
      label: getNetWorkLabel('https://cryptologos.cc/logos/avalanche-avax-logo.png', NETWORKNAMES.AVALANCHE),
      gasToken: 'avax',
      id: 'avalanche-2',
      poolAddress: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
      provider: 'https://rpc.ankr.com/avalanche',
      abiUrl: 'https://api.snowtrace.io/api?module=contract&action=getabi&address=',
      placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      wallets: evmWallets,
      chain_net: 'avalanche',
    },
    {
      value: NETWORKNAMES.SOLANA,
      label: getNetWorkLabel('https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png', NETWORKNAMES.SOLANA),
      gasToken: 'sol',
      id: 'sol-wormhole',
      poolAddress: 'Jupiter',
      poolAddresses: [{
        label: 'Jupiter',
        value: 'Jupiter',
      }],
      provider: 'https://rpc.ankr.com/solana',
      abiUrl: '',
      placeholder: 'Ho4LqtAVeEcahTXEpXTxLuynxAxabv1et9aEpcnKAugM',
      wallets: solanaWallets,
      chain_net: 'solana',
    },
    {
      value: NETWORKNAMES.COSMOS,
      label: getNetWorkLabel('https://s2.coinmarketcap.com/static/img/coins/200x200/3794.png', NETWORKNAMES.COSMOS),
      gasToken: 'atom',
      id: 'cosmos',
      poolAddress: 'Juno',
      poolAddresses: [{
        label: 'Juno',
        value: 'Juno',
      }],
      placeholder: 'juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
      wallets: cosmosWallets,
      chain_net: 'cosmos',
    },
    {
      value: NETWORKNAMES.TEZOS,
      label: getNetWorkLabel('https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png', NETWORKNAMES.TEZOS),
      gasToken: 'tezos',
      id: 'tezos',
      poolAddress: 'Vortex',
      poolAddresses: [{
        label: 'Vortex',
        value: 'Vortex',
      }],
      provider: 'https://mainnet-tezos.giganode.io',
      placeholder: 'KT1Ti3rLGSry1HjVnh6wZftAMWuDFc4H2AHk',
      wallets: tezosWallets,
      chain_net: 'tezos',
    },
    {
      value: NETWORKNAMES.APTOS,
      label: getNetWorkLabel('https://pbs.twimg.com/profile_images/1582438667871625216/YMPBcHq5_400x400.jpg', NETWORKNAMES.APTOS),
      gasToken: 'apt',
      id: 'aptos',
      poolAddress: '',
      provider: 'https://fullnode.mainnet.aptoslabs.com/v1',
      placeholder: '0x21ddba785f3ae9c6f03664ab07e9ad83595a0fa5ca556cec2b9d9e7100db0f07',
      wallets: aptosWallets,
      chain_net: 'aptos',
    },
  ]
  const [tabIndex, setTabIndex] = useState(TABNAMES.TOKEN)
  const [network, setNetwork] = useState<any>(networks[0])
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [isValidTokenAddress, setIsValidTokenAddress] = useState(false)
  const [isValidPoolAddress, setIsValidPoolAddress] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [tokenSwapAmount, setTokenSwapAmount] = useState('0')
  const [swapModal, setSwapModal] = useState(false)
  const [exchange, setExchange] = useState('')
  const { publicKey } = useWallet();
  const { connected: connectedAptos, account: accountAptos, connect: connectAptos }: any = useWalletAptos();
  const [nftPrice, setNftPrice] = useState(0)
  const [nftTokenAmount, setNftTokenAmount] = useState('0')
  const [validNftTokenAmount, setValidNftTokenAmount] = useState(false)
  const [nftContractSymbol, setNftContractSymbol] = useState('')
  const [nftContractAddress, setNftContractAddress] = useState('')
  const [validNftContractAddress, setValidNftContractAddress] = useState(false)
  const [nftAbi, setNftAbi] = useState([])
  const [nftWritableFields, setNftWritableFields] = useState<any[]>([])
  const [nftReadableFields, setNftReadableFields] = useState<any[]>([])
  const [selectedNftWriteAbleFields, setSelectedNftWriteAbleFields] = useState<any>()
  const [selectedNftReadAbleFields, setSelectedNftReadAbleFields] = useState<any>()
  const [validForm, setValidForm] = useState(false)
  const [codeBox, setCodeBox] = useState(false)
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [htmlCode, setHtmlCode] = useState('')
  const [holderAddress, setHolderAddress] = useState('')
  const payments = [
    {
      checked: false,
      disabled: false,
      image: AllImage,
      value: PAYMENTSNAMES.ALL,
      label: getNetWorkLabel(AllImage, PAYMENTSNAMES.ALL),
      isAllowed: true,
    },
    {
      checked: false,
      image: CoinBaseImage,
      disabled: false,
      value: PAYMENTSNAMES.COINBASE,
      label: getNetWorkLabel(CoinBaseImage, PAYMENTSNAMES.COINBASE),
      isAllowed: isCoinbasePermission,
    },
    {
      checked: false,
      image: BinanceImage,
      disabled: false,
      value: PAYMENTSNAMES.BINANCE,
      label: getNetWorkLabel(BinanceImage, PAYMENTSNAMES.BINANCE),
      isAllowed: true,
    },
    {
      checked: false,
      disabled: false,
      image: RampImage,
      value: PAYMENTSNAMES.RAMP,
      label: getNetWorkLabel(RampImage, PAYMENTSNAMES.RAMP),
      isAllowed: isRampPermission,
    },
    {
      checked: false,
      image: KadoImage,
      disabled: false,
      value: PAYMENTSNAMES.KADO,
      label: getNetWorkLabel(KadoImage, PAYMENTSNAMES.KADO),
      isAllowed: isKadoPermission,
    },
    {
      checked: false,
      image: PerlinImage,
      disabled: false,
      value: PAYMENTSNAMES.PERLIN,
      label: getNetWorkLabel(PerlinImage, PAYMENTSNAMES.PERLIN),
      isAllowed: true,
    },
  ];
  const [selectedPayments, setSelectedPayments] = useState<any>([payments[0]])
  const [loading, setLoading] = useState(false)
  const [frameModal, setFrameModal] = useState(false)
  const [frameUrl, setFrameUrl] = useState('')
  const [showWalletModal, setShowWalletModal] = useState(false)


  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0`,
    appName: "2cexy",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    //@ts-ignore
    rpcUrl: `https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const BinanceWallet = new WalletConnectConnector({
    //@ts-ignore
    rpc: { 56: 'https://bsc-dataseed.binance.org/' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  });
  //@ts-ignore
  // const ledger = new LedgerConnector({ chainId: 1, url: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f', pollingInterval: 12000 })

  //@ts-ignore
  const { active, account, activate } = useWeb3React();
  useEffect(() => {
    if (active) {
      //@ts-ignore
      console.log('wallet addres=>', account);
      //@ts-ignore
      setHolderAddress(account)
      setShowWalletModal(false);
    }
  }, [account, active])

  const checkTokenAddress = useCallback(async () => {

    // setIsValidTokenAddress(true)
    // return;

    switch (network.value) {
      case NETWORKNAMES.TEZOS:
        if (tokenAddress) {
          setIsValidTokenAddress(true)
        } else {
          setIsValidTokenAddress(false)
        }
        break
      case NETWORKNAMES.SOLANA:
        try {
          const owner = new PublicKey(tokenAddress);
          if (PublicKey.isOnCurve(owner.toBytes()) && PublicKey.isOnCurve(owner.toString())) {
            setIsValidTokenAddress(true)
          } else {
            setIsValidTokenAddress(false)
            // 7UapwdQJtoB3Hq3Xb9hhLmJ86oKj7RAXPa9aLms315Aj
            // Ho4LqtAVeEcahTXEpXTxLuynxAxabv1et9aEpcnKAugM
          }
        } catch (error) {
          setIsValidTokenAddress(false)
        }
        break
      case NETWORKNAMES.COSMOS:
        // juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl
        if (tokenAddress) {
          setIsValidTokenAddress(true)
        } else {
          setIsValidTokenAddress(false)
        }
        break
      case NETWORKNAMES.APTOS:
        setIsValidTokenAddress(true)
        break
      default:
        let valid = false
        try {
          if (checkEVMAddress(tokenAddress)) {
            if (await checkEVMContract(tokenAddress, network.provider)) {
              const abi: any = await getAbi(tokenAddress, network.abiUrl)
              if (abi) {
                const symbol = await getSymbol(tokenAddress, network.provider, abi)
                if (symbol) {
                  setTokenSymbol(symbol)
                  valid = true
                }
              } else {
                valid = false
              }
            }
          } else {
            valid = false
          }
        } catch (error) {
          valid = false
        }
        setIsValidTokenAddress(valid)
        break
    }

  }, [network.abiUrl, network.provider, network.value, tokenAddress])
  const checkPoolAddress = useCallback(async () => {
    if (network.value === NETWORKNAMES.APTOS) {
      setIsValidPoolAddress(true)
    } else {
      if (network.value !== NETWORKNAMES.TEZOS && network.value !== NETWORKNAMES.COSMOS && network.value !== NETWORKNAMES.SOLANA) {
        if (checkEVMAddress(network.poolAddress) && await checkEVMContract(network.poolAddress, network.provider)) {
          setIsValidPoolAddress(true)
        } else {
          setIsValidPoolAddress(false)
        }
      }
    }
  }, [network.value, network.poolAddress, network.provider])
  const checkNftContrctAddress = useCallback(async () => {
    if (network.value === NETWORKNAMES.TEZOS) {

      const validation: ValidationResult = validateContractAddress(nftContractAddress);
      if (validation === ValidationResult.VALID) {
        setValidNftContractAddress(true)
        let url = `https://api.tzstats.com/explorer/contract/${nftContractAddress}/script?prim=0`
        const response = await axios.get(url)
        if (response && response.data) {
          const wAbi = Object.values(response.data.entrypoints).filter((item: any) => {
            item.label = item.name
            item.value = item.name
            return item
          });
          setNftWritableFields(wAbi)
        }

        let url1 = `https://api.tzstats.com/explorer/contract/${nftContractAddress}/storage?prim=0`
        const response1 = await axios.get(url1)
        if (response1 && response1.data) {
          const storage = response1.data.value
          let rAbi: any[] = []
          for (let index = 0; index < Object.keys(storage).length; index++) {
            const key = Object.keys(storage)[index];
            rAbi.push({
              name: key,
              label: key,
              value: key,
              originValue: storage[key],
            })
          }
          setNftReadableFields(rAbi)
        }
      } else {
        setValidNftContractAddress(false)
      }

    } else if (network.value === NETWORKNAMES.SOLANA) {

    } else if (network.value === NETWORKNAMES.COSMOS) {

    } else {
      try {
        if (checkEVMAddress(nftContractAddress) && await checkEVMContract(nftContractAddress, network.provider)) {
          setValidNftContractAddress(true)
          const abi: any = await getAbi(nftContractAddress, network.abiUrl)
          if (abi) {
            setNftAbi(abi)
            setNftWritableFields(getWriteAbleMethodsFromAbi(abi))
            setNftReadableFields(getReadAbleMethodsFromAbi(abi))
            const symbol = await getSymbol(nftContractAddress, network.provider, abi)
            if (symbol) {
              setNftContractSymbol(symbol)
            }
          }
        }
      } catch (error) {
        setValidNftContractAddress(false)
      }
    }
  }, [network.abiUrl, network.provider, network.value, nftContractAddress])

  const getNftPrice = useCallback(async () => {
    if (Number(nftTokenAmount) > 0 && tabIndex === TABNAMES.NFTS) {
      setValidNftTokenAmount(true)
      let url = `https://api.coingecko.com/api/v3/simple/price?ids=${network.id}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2`
      try {
        const response = await axios.get(url)
        setNftPrice(parseFloat((parseFloat(response.data[network.id]['usd']) * Number(nftTokenAmount)).toFixed(2)))
      } catch (error) {
      }
    } else {
      setValidNftTokenAmount(false)
    }
  }, [network.id, nftTokenAmount, tabIndex])

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkTokenAddress()
    }, 500)
    return () => clearTimeout(timeout)
  }, [checkTokenAddress])

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkPoolAddress()
    }, 500)
    return () => clearTimeout(timeout)
  }, [checkPoolAddress])

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkNftContrctAddress()
    }, 500)
    return () => clearTimeout(timeout)
  }, [checkNftContrctAddress])

  useEffect(() => {
    const timeout = setTimeout(() => {
      getNftPrice()
    }, 500)
    return () => clearTimeout(timeout)
  }, [getNftPrice])

  useEffect(() => {
    if (tabIndex === TABNAMES.TOKEN) {
      if (isValidTokenAddress && isValidPoolAddress) {
        setValidForm(true)
      } else {
        setValidForm(false)
      }
    } else if (tabIndex === TABNAMES.NFTS) {
      if (validNftTokenAmount && validNftContractAddress && selectedNftWriteAbleFields && selectedNftWriteAbleFields.length > 0) {
        setValidForm(true)
      } else {
        setValidForm(false)
      }
    }
  }, [isValidPoolAddress, isValidTokenAddress, selectedNftWriteAbleFields, tabIndex, validNftContractAddress, validNftTokenAmount])

  useEffect(() => {
    if (publicKey) {
      try {
        setHolderAddress(publicKey.toString())
        setShowWalletModal(false);
      } catch (error) {

      }
    }
  }, [publicKey])

  const checkEVM = (e: any) => {
    if (e.value === NETWORKNAMES.TEZOS) {
      return NETWORKTYPES.TEZOS
    } else if (e.value === NETWORKNAMES.SOLANA) {
      return NETWORKTYPES.SOLANA
    } else if (e.value === NETWORKNAMES.COSMOS) {
      return NETWORKTYPES.COSMOS
    }
    return NETWORKTYPES.EVM
  }

  const onChangeNetWork = (value: any) => {
    let oldType = checkEVM(network)
    let newType = checkEVM(value)
    if (tabIndex === TABNAMES.TOKEN) {

    } else if (tabIndex === TABNAMES.NFTS) {
      setNftAbi([])
      setNftReadableFields([])
      setNftWritableFields([])
      setSelectedNftReadAbleFields([])
      setSelectedNftWriteAbleFields([])
    }

    if (oldType !== newType) {
      setHolderAddress('')
    }
    setNetwork(value)
    props.setChain(value.chain_net);
  }

  const getPoolAddressContent = () => {
    return <Form.Group>
      {
        (network.value === NETWORKNAMES.SOLANA || network.value === NETWORKNAMES.TEZOS || network.value === NETWORKNAMES.COSMOS) ? <>
          <Form.Label>{network.value === NETWORKNAMES.TEZOS ? 'Dex' : 'LIQUIDITY POOL V2 ROUTER ADDRESS (OPTIONAL)'}</Form.Label>
          <Select
            value={{ label: network.poolAddress, value: network.poolAddress }}
            options={network.poolAddresses}
            onChange={(e) => {
              setNetwork((prev: any) => {
                prev.poolAddress = e?.value
                return prev
              })
            }}
            isSearchable={false}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#61DAFB',
                primary: '#61DAFB',
              }
            })} styles={poolAddressCustomStyle} />
        </> : <>
          <Form.Label>LIQUIDITY POOL V2 ROUTER ADDRESS (OPTIONAL)</Form.Label>
          <Form.Control
            isValid={isValidPoolAddress}
            isInvalid={!isValidPoolAddress}
            type="text"
            value={network.poolAddress}
            onChange={(event) => {
              setNetwork({ ...network, poolAddress: event.target.value })
            }} />
          <Form.Control.Feedback type="invalid">Please input valid pool address</Form.Control.Feedback>
          <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Poll address validated</Form.Control.Feedback>
        </>
      }
    </Form.Group>
  }

  const getNftWriteAbleInputFields = () => {
    if (selectedNftWriteAbleFields) {
      if (network.value === NETWORKNAMES.TEZOS) {
        return <></>
      } else if (network.value === NETWORKNAMES.SOLANA) {
        return <></>
      } else if (network.value === NETWORKNAMES.COSMOS) {
        return <></>
      } else {
        return <>
          {
            selectedNftWriteAbleFields.map((item: any, index: number) => {
              return <Form.Group key={`contract_${index}`} className='mb-1 subGroup'>
                <Form.Label> {`${index + 1}. ${item.name}`}</Form.Label>
                {
                  item.inputs.map((inputItem: any, inputIndex: number) => {
                    return <Form.Control
                      className="m-1 p-2"
                      key={`input_${inputIndex}`}
                      value={inputItem.value}
                      type="text"
                      required
                      placeholder={inputItem.name}
                      onChange={(event: any) =>
                        setSelectedNftWriteAbleFields((prev: { inputs: { value: any; }[]; }[]) => {
                          prev[index].inputs[inputIndex].value = event.target.value
                          return [...prev]
                        })
                      } />
                  })
                }
              </Form.Group>
            })
          }
        </>
      }
    } else {
      return <></>
    }
  }

  const getNftReadAbleInputFields = () => {
    if (selectedNftReadAbleFields) {
      if (network.value === NETWORKNAMES.TEZOS) {
        return <></>
      } else if (network.value === NETWORKNAMES.SOLANA) {
        return <></>
      } else if (network.value === NETWORKNAMES.COSMOS) {
        return <></>
      } else {
        return <>
          {
            selectedNftReadAbleFields.map((item: any, index: number) => {
              return <div key={`contract_${index}`}>
                <Form.Group className='mb-1 subGroup'>
                  <Form.Label> {`${index + 1}. ${item.name}`}</Form.Label>
                  {
                    item.inputs.map((inputItem: any, inputIndex: number) => {
                      return <Form.Control
                        className="m-1 p-2"
                        key={`input_${inputIndex}`}
                        value={inputItem.value}
                        type="text"
                        required
                        placeholder={inputItem.name}
                        onChange={(event: any) =>
                          setSelectedNftReadAbleFields((prev: { inputs: { value: any; }[]; }[]) => {
                            prev[index].inputs[inputIndex].value = event.target.value
                            return [...prev]
                          })
                        } />
                    })
                  }
                </Form.Group>

                <Form.Group className='mb-1 subGroup'>
                  <Form.Label> {`${item.name} OUTPUT VALUE`}</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={item.outValue}
                    onChange={(event) =>
                      setSelectedNftReadAbleFields((prev: { outValue: string; }[]) => {
                        prev[index].outValue = event.target.value
                        return [...prev]
                      })
                    } />
                </Form.Group>
              </div>
            })
          }
        </>
      }
    } else {
      return <></>
    }
  }

  const onPaymentsChanged = (e: any) => {
    if (e.length > 0) {
      if (e[e.length - 1].value === PAYMENTSNAMES.ALL && e.length > 1) {
        setSelectedPayments([payments[0]])
      } else {
        setSelectedPayments(e.filter((element: any) => element.value !== PAYMENTSNAMES.ALL))
      }
    }
  }

  const filteredPayments = () => {
    if (selectedPayments && selectedPayments.length > 0 && selectedPayments[0].value === PAYMENTSNAMES.ALL) {
      return payments.filter((e) => e.value !== PAYMENTSNAMES.ALL)
    }
    return selectedPayments
  }

  const getUnerInputContract = (fields: any[]) => {
    let result: any[] = []
    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      let inputs: any = {}
      let params: any[] = []
      for (let i = 0; i < element.inputs.length; i++) {
        const item = element.inputs[i];
        if (item.name === 'payableAmount') {
          inputs.value = item.value
        } else {
          params.push(item.value)
        }
      }
      inputs.params = params
      let object = {
        name: element.name,
        inputs: inputs
      }
      result.push(object)
    }
    return JSON.stringify(result)
  }

  const generateHtmlCode = () => {
    let strCode = '';
    const exchagneName = filteredPayments()[0].value
    if (tabIndex === TABNAMES.TOKEN) {
      strCode = `const payload = {
        "api_key": '',
        "network": '${network.value}',
        "token_address": '${tokenAddress}',
        "pool_address": '${network.poolAddress}',
        "slippage": '${slippage}',
        "orgination": '${exchagneName}',
        "token_type": 'Tokens',
        "swap_amount": ${Number(tokenSwapAmount)},
        "token_id": ${network.id},
        "holder_address": '${holderAddress}'
    }
    axios.post("https://localhost:3001/checkout", payload)
    .then(res => {
        window.open(res.data, '_blank')
    }).catch(e => {
        console.error(e)
    })
  `} else if (tabIndex === TABNAMES.NFTS) {
      strCode = `const payload = {
      "api_key": '',
      "network": '${network.value}',
      "contract_address": '${nftContractAddress}',
      "orgination": '${exchagneName}',
      "tokenType": 'NFTs',
      "holder_address": '${holderAddress}',
      "selected_functions":${getUnerInputContract(selectedNftWriteAbleFields)},
      "price_nft": ${nftPrice},
      "token_id": ${network.id},
      "token_amount":${Number(nftTokenAmount)},
      "abi":${JSON.stringify(nftAbi)}
  }
  axios.post("https://api.2cexy.com/checkout", payload)
  .then(res => {
    if (res.data && res.data.status === 200) {
      window.open(res.data.message, '_blank')
    }
  }).catch(e => {
      console.error(e)
  })
`
    }
    setHtmlCode(strCode)
    setCodeBox(false)
    setTimeout(() => {
      setCodeBox(true)
      setTimeout(() => {
        if (codeRef && codeRef.current) {
          codeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300);
    }, 100)
  }

  const onGenerate = () => {
    if (tabIndex === TABNAMES.TOKEN) {
      generateHtmlCode()
    } else if (tabIndex === TABNAMES.NFTS) {
      checkMinting()
    }
  }

  const getTabContent = () => {
    return <Form>
      <Form.Group className='mb-3'>
        <Form.Label>SELECT NETWORK</Form.Label>
        <Select
          value={network}
          options={networks}
          onChange={(e) => onChangeNetWork(e)}
          isSearchable={false}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#61DAFB',
              primary: '#61DAFB',
            }
          })} styles={networksCustomStyle} />
      </Form.Group>
      {
        tabIndex === TABNAMES.TOKEN ? <>
          <Form.Group className="mb-2">
            <InputGroup className='d-flex align-items-center justify-content-between'>
              <Form.Label>{network.value === NETWORKNAMES.TEZOS ? 'ENTER YOUR DEX PAIR CONTRACT ADDRESS WITH LIQUIDITY' : 'ENTER YOUR TOKEN ADDRESS'}</Form.Label>
              <Form.Label className='symbol'>{`${tokenSymbol}`}</Form.Label>
            </InputGroup>
            <Form.Control
              required
              isValid={isValidTokenAddress}
              isInvalid={!isValidTokenAddress}
              type="text"
              value={tokenAddress}
              placeholder={network.placeholder}
              onChange={(event) => {
                setTokenAddress(event.target.value)
              }} />
            <Form.Control.Feedback type="invalid">Please input valid token address</Form.Control.Feedback>
            <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Token address validated</Form.Control.Feedback>
          </Form.Group>
          {
            network.value !== NETWORKNAMES.APTOS && getPoolAddressContent()
          }

          <Form.Group className="mb-5">
            <Form.Label>SLIPPAGE(%)</Form.Label>
            <InputGroup>
              <InputGroup.Text onClick={() => setSlippage(0.5)} className="autoButton">Auto</InputGroup.Text>
              <Form.Control
                required
                type="number"
                className="text-align-right"
                value={slippage}
                onChange={(event) => setSlippage(Number(event.target.value))} />
              <InputGroup.Text className="slippagePercent">%</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </> : tabIndex === TABNAMES.NFTS && <>
          <Form.Group className='mb-2'>
            <InputGroup className='d-flex align-items-center justify-content-between'>
              <Form.Label>PRICE OF NFT ${nftPrice.toFixed(2)}</Form.Label>
              <Form.Label className='symbol'>{network.gasToken.toUpperCase()}</Form.Label>
            </InputGroup>
            <Form.Control
              isValid={validNftTokenAmount}
              isInvalid={!validNftTokenAmount}
              type="number"
              value={nftTokenAmount}
              onChange={(event) => {
                setNftTokenAmount(event.target.value)
              }} />
            <Form.Control.Feedback type="invalid">Please input valid amount</Form.Control.Feedback>
            <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Pice NFT validated</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2'>
            <InputGroup className='d-flex align-items-center justify-content-between'>
              <Form.Label>ENTER YOUR CONTRACT ADDRESS (CONTRACT ADDRESS REQUIRED)</Form.Label>
              <Form.Label className='symbol'>{`${nftContractSymbol}`}</Form.Label>
            </InputGroup>
            <Form.Control
              isValid={validNftContractAddress}
              isInvalid={!validNftContractAddress}
              type="text"
              required
              placeholder='0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
              value={nftContractAddress}
              onChange={(event) => {
                setNftContractAddress(event.target.value)
              }} />
            <Form.Control.Feedback type="invalid">Please input valid contract address</Form.Control.Feedback>
            <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Contract Address validated</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>WRITE TO CONTRACT FUNCTIONS</Form.Label>
            <Select
              value={selectedNftWriteAbleFields}
              options={nftWritableFields}
              onChange={setSelectedNftWriteAbleFields}
              isSearchable={false}
              isMulti
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#61DAFB',
                  primary: '#61DAFB',
                }
              })} styles={nftMethodsCustomStyle} />
            <Form.Control.Feedback type="invalid">Please select at least one of method</Form.Control.Feedback>
            <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Contract method validated</Form.Control.Feedback>
          </Form.Group>
          {
            getNftWriteAbleInputFields()
          }
          <Form.Group className='mb-2'>
            <Form.Label>READ CONTRACT FUNCTIONS</Form.Label>
            <Select
              value={selectedNftReadAbleFields}
              options={nftReadableFields}
              onChange={setSelectedNftReadAbleFields}
              isSearchable={false}
              isMulti
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#61DAFB',
                  primary: '#61DAFB',
                }
              })} styles={nftMethodsCustomStyle} />
            <Form.Control.Feedback type="invalid">Please select at least one of method</Form.Control.Feedback>
            <Form.Control.Feedback style={{ color: '#3c404d' }} type="valid">Contract method validated</Form.Control.Feedback>
          </Form.Group>
          {
            getNftReadAbleInputFields()
          }
        </>
      }

      <Form.Group className="mb-3">
        <Form.Label>SELECT YOUR PREFERRED PAYMENT METHODS:</Form.Label>
        <Select
          value={selectedPayments}
          options={payments}
          onChange={(e) => onPaymentsChanged(e)}
          isSearchable={false}
          isMulti
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#61DAFB',
              primary: '#61DAFB',
            }
          })} styles={paymentsCustomStyle} />
      </Form.Group>

      <Form.Group>
        <Button disabled={!validForm} onClick={() => { onGenerate(); }} variant={validForm ? 'success' : 'primary'} size={'lg'} className="w-100 p-3">{codeBox ? 'Regenerate Code' : 'Generate Code'}</Button>
      </Form.Group>
    </Form>
  }
  const connectWalletCustom = async (item: any) => {
    if (item.name === 'Web3Auth') {
      setShowWalletModal(false);
      login();
    } else {
      if (network.value === NETWORKNAMES.TEZOS) {
        if (item.name === 'Temple Wallet') {
          try {
            const available = await TempleWallet.isAvailable();
            if (!available) {
              showMessage('Please install Temple Wallet')
              window.open('https://chrome.google.com/webstore/detail/temple-tezos-wallet/ookjlbkiijinhpmnjffcofjonbfbgaoc', '_blank')
              return
            }
            const wallet = new TempleWallet("Awsome");
            await wallet.connect("mainnet", { forcePermission: true });
            const tezos = wallet.toTezos();
            const accountPkh = await tezos.wallet.pkh();
            console.log('wallet address==>', accountPkh)
            setHolderAddress(accountPkh);
            setShowWalletModal(false);
          } catch (err) {
            console.error(err);
          }
        }
      } else if (network.value === NETWORKNAMES.COSMOS) {
        if (item.name === 'Keplr') {
          //@ts-ignore
          while (!window.keplr) {
            showMessage('Install Keplr Wallet')
            window.open('https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en', '_blank')
            return
          }
          const CHAIN_ID = "juno-1";
          //@ts-ignore
          await window.keplr.enable(CHAIN_ID);
          //@ts-ignore
          const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
          const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
          console.log('wallet address==>', myAddress)
          setHolderAddress(myAddress)
          setShowWalletModal(false);
        }

      } else if (network.value === NETWORKNAMES.APTOS) {
        connectAptos(item.name)
      } else if (network.value === NETWORKNAMES.SOLANA) {
        if (item.name === 'Solflare') {
          //@ts-ignore
          while (!window.solflare) {
            showMessage('Install Solflare Wallet')
            window.open('https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic', '_blank')
            return
          }
          //@ts-ignore
          window.solflare.connect();
          //@ts-ignore
          window.solflare.on("connect", () => {
            //@ts-ignore
            setHolderAddress(window.solflare.publicKey.toString());
            //@ts-ignore
            console.log('wallet address==>', window.solflare.publicKey.toString())
            setShowWalletModal(false);
          });
        } else if (item.name === 'Ledger') {

        } else if (item.name === 'Sollet') {
          //@ts-ignore
          while (!window.sollet) {
            showMessage('Install Sollet Wallet')
            window.open('https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno?hl=en', '_blank')
            return
          }
          //@ts-ignore
          const provider = 'https://www.sollet.io';
          const networkSolana = WalletAdapterNetwork.Mainnet;
          let SolWalletAdapterClass: typeof SolWalletAdapter;
          try {
            SolWalletAdapterClass = (await import('@project-serum/sol-wallet-adapter')).default;
          } catch (error: any) {
          }
          let sollet_wallet: SolWalletAdapter;
          try {
            //@ts-ignore
            sollet_wallet = new SolWalletAdapterClass(provider, networkSolana);
          } catch (error: any) {
            showMessage('Y')
          }
          try {
            await new Promise<void>((resolve, reject) => {
              const connect = () => {
                sollet_wallet.off('connect', connect);
                resolve();
              };

              sollet_wallet.on('connect', connect);

              sollet_wallet.connect().catch((reason: any) => {
                sollet_wallet.off('connect', connect);
                reject(reason);
              });
            });
          } finally {
            //@ts-ignore
            console.log('wallet address==>', sollet_wallet.publicKey.toString(16))
            //@ts-ignore
            setHolderAddress(sollet_wallet.publicKey.toString(16));
            setShowWalletModal(false);
          }
        } else if (item.name === 'Strike') {
          let StrikeClass: typeof StrikeWallet;
          try {
            StrikeClass = (await import('@strike-protocols/solana-wallet-adapter')).StrikeWallet;
          } catch (error: any) {
            throw new WalletLoadError(error?.message, error);
          }

          let wallet: StrikeWallet;
          try {
            wallet = new StrikeClass();
          } catch (error: any) {
            throw new WalletConfigError(error?.message, error);
          }

          let publicKey: PublicKey;
          try {
            publicKey = await wallet.connect('https://wallet.strikeprotocols.com');
            console.log('wallet address==>', publicKey.toString())
            setHolderAddress(publicKey.toString());
            setShowWalletModal(false);
          } catch (error: any) {
            throw new WalletConnectionError(error?.message, error);
          }
        }

      } else {
        if (item.name === 'Metamask') {
          let provider = await detectEthereumProvider();
          //get account
          //@ts-ignore
          if (provider.providerMap) {
            //@ts-ignore
            provider = provider.providerMap.get("MetaMask");
          }
          if (window.ethereum) {
            try {
              //@ts-ignore
              const res = await provider.request({
                method: "eth_requestAccounts",
              });
              console.log('wallet address==>', res[0])
              setHolderAddress(res[0]);
              setShowWalletModal(false);
            } catch (err) {
              showMessage("There was a problem connecting to MetaMask");
            }
          } else {
            showMessage("Install MetaMask");
          }

          // if (network.value == NETWORKNAMES.BINANCESMARTCHAIN) {
          //   netName = "bsc";
          // } else if (network.value == NETWORKNAMES.AVALANCHE) {
          //   netName = "avalanche";

          // } else if (network.value == NETWORKNAMES.POLYGON) {
          //   netName = "polygon";
          // } else {
          //   netName = "ethereum";
          // }
          //switch Network
          // try {
          //   //@ts-ignore
          //   await provider.request({
          //     method: 'wallet_switchEthereumChain',
          //     //@ts-ignore
          //     params: [{ chainId: networks[netName].chainId }], // chainId must be in hexadecimal numbers
          //   });
          // } catch (err) {
          //   try {
          //     //@ts-ignore
          //     await provider.request({
          //       method: "wallet_addEthereumChain",
          //       params: [
          //         {
          //           //@ts-ignore
          //           ...networks[netName]
          //         }
          //       ]
          //     });
          //   } catch (err) {
          //     //@ts-ignore
          //     showMessage(err.message);
          //   }
          // }
        } else if (item.name === 'Coinbase') {
          activate(CoinbaseWallet);
        } else if (item.name === 'Wallet Connect') {
          activate(WalletConnect);
        } else if (item.name === 'Binance Wallet') {
          activate(BinanceWallet);
        }
      }
    }

  }

  useEffect(() => {
    if (connectedAptos) {
      if (accountAptos) {
        console.log('wallet address==>', accountAptos.address)
        setHolderAddress(accountAptos.address)
      }
    }
  }, [accountAptos, connectedAptos])

  const submit = (name: string = '') => {
    let payload = {}
    let paymentName = ''
    if (tabIndex === TABNAMES.TOKEN) {
      payload = {
        api_key: '',
        network: network.value,
        token_address: tokenAddress,
        pool_address: network.poolAddress,
        slippage: slippage,
        token_type: 'Tokens',
        swap_amount: Number(tokenSwapAmount),
        orgination: exchange,
        destination_wallet: holderAddress,
        selected_functions: '',
        staging: devMode,
        token_id: network.id,
        private_key: private_key,
      }
      paymentName = exchange
    } else {
      payload = {
        api_key: '',
        network: network.value,
        contract_address: nftContractAddress,
        token_type: 'NFTs',
        price_nft: nftPrice,
        token_amount: Number(nftTokenAmount),
        orgination: name,
        destination_wallet: holderAddress,
        // selected_functions: getUnerInputContract(selectedFields),
        abi: JSON.stringify(nftAbi),
        staging: devMode,
        token_id: network.id,
        private_key: private_key,
      }
      paymentName = name
    }
    setLoading(true)
    // axios.post("https://api.2cexy.com/checkout", payload)
    axios.post("http://localhost:3000/checkout", payload)
      .then(res => {
        setLoading(false)
        if (res.data && res.data.status === 200) {
          if (paymentName === PAYMENTSNAMES.PERLIN) {     
            setFrameUrl(res.data.message)
            setFrameModal(true)
          } else {
            let win = window.open()
            if (win) {
              win.location = res.data.message
              win.opener = null
              win.blur()
              window.focus()
            }
          }
        }


      }).catch(e => {
        console.error(e)
        setLoading(false)
      })
  }

  const checkMinting = async () => {
    if (network.value === NETWORKNAMES.TEZOS) {

    } else if (network.value === NETWORKNAMES.SOLANA) {

    } else if (network.value === NETWORKNAMES.COSMOS) {

    } else {
      if (selectedNftReadAbleFields && selectedNftReadAbleFields.length > 0) {
        try {
          let web3 = new Web3(network.provider)
          const contract = new web3.eth.Contract(nftAbi, nftContractAddress);
          let mintingOver = false

          for (let index = 0; index < selectedNftReadAbleFields.length; index++) {
            const element: any = selectedNftReadAbleFields[index];
            const params = getParameters(element.inputs)
            const result = await (contract.methods[element.name](...params)).call();
            if (convertToTypeOf(result) === element.outValue.toLowerCase()) {
              mintingOver = true
            } else {
              mintingOver = false
              break
            }
          }

          if (mintingOver) {
            showMessage("Minting is Over. Please check an NFT Marketplace to purchase")
          } else {
            generateHtmlCode()
          }

        } catch (error) {
          showMessage("Please input correct parameter for read function")
        }
      } else {
        generateHtmlCode()
      }
    }
  }

  const onExchagneClicked = async (exchangeName: string) => {
    if (tabIndex === TABNAMES.TOKEN) {
      setSwapModal(true)
    } else if (tabIndex === TABNAMES.NFTS) {
      submit(exchangeName)
    }
  }
  return (
    <div className='landing'>
      <section className='section-header masthead overflow-hidden text-white' id='home'>
        <Button variant={'dark'} size='sm' className='p-3 demoButton'>Demo Integrations</Button>
        <Container className='h-100 d-flex flex-column align-items-center justify-content-center'>
          <Row className='d-flex align-items-center'>
            <Col xs={12} md={6}>
              <h1 className='primary-hero__title animate__animated animate__fadeInDown'>
                I'm <span>
                  <Image src={LogoImage} width={54} className='mb-3' alt='Logo' />
                </span>exy <span id='ityped2'
                  className='ityped2'></span>
              </h1>
              <div className='typed'>
                <span id='ityped' className='ityped' />
              </div>
              <p className='primary-hero__content animate__animated animate__fadeInLeftBig'>
                Millions of people want to buy NFTs, AltCoins, and spend Crypto on websites but there are several steps involved that make it challenging for the everyday user. There are several complicated steps involved in the process, often time leaving people frustrated.
              </p>
              <p className='primary-hero__content animate__animated animate__fadeInLeftBig'>
                2Cexy is the new standard available to be integrated into DEXs, NFT Platforms, Websites, and Crypto Gaming Systems allowing people to use their favorite Exchanges and Crypto onramps to login, check out with ANY cryptocurrency on ANY available blockchain, and receive YOUR token in their wallet in 3 easy steps.
              </p>
            </Col>
            <Col xs={0} md={6} className='icontainer'>
              <div className='base-circle-wrap'>
                <Image
                  src={CoinsImage}
                  loading='lazy'
                  alt=''
                  className='htb-circle-1 animate__animated  animate__pulse animate__infinite	infinite'
                />
                <Image
                  src={CircleImage}
                  loading='lazy'
                  alt=''
                  className='rotating htb-circle-dashes'
                />
                <div className='circle-glued-coins rotating2'>
                  <Image src={GC1Image} loading='lazy' alt='' className='gc-1' />
                  <Image src={GC2Image} loading='lazy' alt='' className='gc-2' />
                  <Image src={GC3Image} loading='lazy' alt='' className='gc-3' />
                  <Image src={GC4Image} loading='lazy' alt='' className='gc-4' />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className='clogo'>
                <div className='aseen'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='p-2'>
                      <div>
                        <Image src={CoinBaseImage} width='60px' alt='' />
                      </div>
                      <p className='clabel'>Coinbase</p>
                    </div>
                    <div className='p-2'>
                      <div>
                        <Image src={BinanceImage} width='60px' alt='' />
                      </div>
                      <p className='clabel'>Binance</p>
                    </div>
                    <div className='p-2'>
                      <div >
                        <Image src={CryptoImage} width='60px' alt='' />
                      </div>
                      <p className='clabel'>Crypto</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='section section-md bg-dark'>
        <Container>
          <Row className='justify-content-between align-items-center'>
            <Col xs={12} className='text-center section_title'>
              <h2 data-aos='fade-up'>
                {tabIndex === TABNAMES.TOKEN ? `Are You A Crypto Company Ready To Integrate? Here’s How:` : 'Are you an NFT Project ready to integrate? Here’s how:'}
              </h2>
              <p data-aos='fade-up' className='lgray'>
                {`Enter the values below to generate code that is displayed once a
                user connects their web3 wallet. Once the user completes the
                checkout process, they will receive your ${tabIndex === TABNAMES.TOKEN ? 'alticoin' : tabIndex === TABNAMES.NFTS && 'NFT'} in their wallet.`}
              </p>
            </Col>
          </Row>
          <Row className='justify-content-between align-items-center'>
            <Col xs={12} className='text-center d-flex align-items-center'>
              <Button onClick={() => setTabIndex(TABNAMES.TOKEN)} variant={tabIndex === TABNAMES.TOKEN ? 'success' : 'primary'} className='mc-1'>{TABNAMES.TOKEN}</Button>
              <Button onClick={() => setTabIndex(TABNAMES.NFTS)} variant={tabIndex === TABNAMES.NFTS ? 'success' : 'primary'} className='mc-1'>{TABNAMES.NFTS}</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='tab-content'>
              {getTabContent()}
            </Col>
          </Row>
          {
            codeBox && <Row data-aos="fade-up" ref={codeRef}>
              <Col xs={12}>
                <Documentation
                  title="Example"
                  description={<></>}
                  scope={{ Button }}
                  imports={`Add these Javascript files to the header of your website if they aren't included already
"https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js"
"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"`}
                  copyTextImport={`"https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js"
                  "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"`}
                  download={`Download full source code for connect wallet.`}
                  downloadUrl={`https://2cexy.com/sample.zip`}
                  example={htmlCode}
                />
              </Col>
            </Row>
          }
          {
            (!holderAddress && codeBox) && <Row>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <Form.Group>
                  {/* {network.value === NETWORKNAMES.SOLANA ? <WalletMultiButton className="mc-1 p-3 connectButton" /> : <Button disabled={false} onClick={() => connectWallet()} variant={true ? 'success' : 'primary'} className="mc-1 p-3">Connect Wallet</Button>} */}
                  <Button onClick={() => { setShowWalletModal(true); if (web3authProvider) logout() }} variant={'success'} className="mc-1 p-3">Connect Wallet</Button>
                </Form.Group>
              </Col>
            </Row>
          }
          {holderAddress && <Row>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              {
                filteredPayments().map((item: any, index: number) => {
                  return <CheckBox
                    key={`preview_${index}`}
                    background={item.image}
                    label={item.value}
                    disabled={false}
                    checked={true}
                    hide={!item.isAllowed}
                    setChecked={(v: boolean) => {
                      setExchange(item.value)
                      onExchagneClicked(item.value)
                    }}
                  />
                })
              }
            </Col>
          </Row>
          }
        </Container>
      </section>
      <footer className="footer py-6 bg-dark text-white">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              Powered by 2Cexy.com(1.0.22)
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center lgray">
              This website and its content is copyright of 2Cexy.com - © 2Cexy.com 2022. All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited.
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="text-center terms">
              <a href="policies.html" target="_blank">Privacy Policies</a>  |  <a href="tos.html" target="_blank">Terms of Services</a>
            </Col>
          </Row>
        </Container>
      </footer>
      <Modal
        isOpen={frameModal}
        style={modalStyles}>
        <Iframe url={frameUrl}
          width="700px"
          src=''
          height="730px"
          id=""
          className=""
          display="block"
          onLoad={() => {

          }}
          position="relative" />
      </Modal>
      <Modal
        isOpen={swapModal}
        onRequestClose={() => {
          // setSwapModal(false)
        }}
        style={modalStyles}
        contentLabel=""
      >
        <Form.Group className='mb-2'>
          <Form.Label>INPUT YOUR SWAP AMOUNT(USD)</Form.Label>
          <Form.Control
            type="number"
            required
            value={tokenSwapAmount}
            onChange={(event) => {
              setTokenSwapAmount(event.target.value)
            }} />
        </Form.Group>
        <Form.Group className='d-flex align-items-center justify-content-between'>
          <Button onClick={() => {
            if (Number(tokenSwapAmount) < 0) {
              showMessage('Please input more than zero')
              return
            }
            setSwapModal(false)
            submit()
          }} variant={'success'} size={'sm'} className="mc-1">{'Continue'}</Button>
          <Button onClick={() => {
            setSwapModal(false)
          }} variant={'primary'} size={'sm'} className="mc-1">{'Cancel'}</Button>
        </Form.Group>
      </Modal>
      <WalletModal visible={showWalletModal} setVisible={setShowWalletModal} wallets={network.wallets} network={network.value} onClick={connectWalletCustom} />
      {loading &&
        <div className='loading'>
          <Bars
            height="80"
            width="80"
            color="#f00"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      }
    </div >
  )
}
export default Landing

