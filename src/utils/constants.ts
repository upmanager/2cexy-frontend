export enum TABNAMES {
  TOKEN = "Token",
  NFTS = "NFTs",
}

export enum NETWORKNAMES {
  BINANCESMARTCHAIN = "Binance Smart Chain",
  ETHEREUM = "Ethereum",
  POLYGON = "Polygon",
  AVALANCHE = "Avalanche",
  SOLANA = "Solana",
  COSMOS = "Cosmos",
  TEZOS = "Tezos",
  APTOS = "Aptos",
}

export enum NETWORKTYPES {
  EVM = 0,
  SOLANA,
  COSMOS,
  TEZOS,
  APTOS,
}

export enum PAYMENTSNAMES {
  ALL = "All",
  COINBASE = "Coinbase",
  BINANCE = "Binance",
  RAMP = "Ramp",
  KADO = "Kado",
  PERLIN = "Perlin",
}

export const networksCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
    backgroundColor: "#3c404d",
    padding: "10px",
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return {
      ...provided,
      opacity,
      transition,
      color: "white",
    };
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#3c404d" : "#323642",
      color: "white",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#3c404d",
      },
    };
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: "0px",
      border: "1px solid white",
    };
  },
};

export const poolAddressCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
    backgroundColor: "#3c404d",
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return {
      ...provided,
      opacity,
      transition,
      color: "white",
    };
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#3c404d" : "#323642",
      color: "white",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#3c404d",
      },
    };
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: "0px",
      border: "1px solid white",
    };
  },
};

export const nftMethodsCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
    backgroundColor: "#3c404d",
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return {
      ...provided,
      opacity,
      transition,
      color: "white",
    };
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#3c404d" : "#323642",
      color: "white",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#3c404d",
      },
    };
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: "0px",
      border: "1px solid white",
    };
  },
};

export const paymentsCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
    backgroundColor: "#3c404d",
    padding: 5,
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
    alignItems: "center",
    display: "flex",
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: ".2rem",
  }),

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#3c404d" : "#323642",
      color: "white",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#3c404d",
      },
    };
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: "0px",
      border: "1px solid white",
    };
  },
};

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#4A5073",
    color: "#FFF",
    padding: 20,
  },
};

export const evmWallets = [
  {
    name: "Web3Auth",
    logo: "web3auth.svg",
    recommended: true,
  },
  {
    name: "Metamask",
    logo: "metamask.svg",
    recommended: false,
  },
  {
    name: "Coinbase",
    logo: "coinbase.svg",
    recommended: false,
  },
  {
    name: "Wallet Connect",
    logo: "walletconnect.svg",
    recommended: false,
  },
  // {
  //   name: "Binance Wallet",
  //   logo: "binance.jpg",
  //   recommended: false,
  // },
];

export const solanaWallets = [
  {
    name: "Web3Auth",
    logo: "web3auth.svg",
    recommended: true,
  },
  {
    name: "Solflare",
    logo: "solana/solflare.svg",
    recommended: false,
  },
  {
    name: "Sollet",
    logo: "solana/sollet.svg",
    recommended: false,
  },
  {
    name: "Strike",
    logo: "solana/strike.svg",
    recommended: false,
  },
  // {
  //   name: "Glow",
  //   logo: "solana/glow.png",
  //   recommended: false,
  // },
  // {
  //   name: "Backpack",
  //   logo: "solana/backpack.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Strike",
  //   logo: "solana/strike.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Phantom",
  //   logo: "solana/phantom.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Slope",
  //   logo: "solana/slope.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Coinbase Wallet",
  //   logo: "solana/coinbase_wallet.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Trust",
  //   logo: "solana/trust.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Clover",
  //   logo: "solana/clover.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Brave",
  //   logo: "solana/brave.svg",
  //   recommended: false,
  // },
];

export const cosmosWallets = [
  {
    name: "Web3Auth",
    logo: "web3auth.svg",
    recommended: true,
  },
  {
    name: "Keplr",
    logo: "cosmos/keplr.jpg",
    recommended: false,
  },
];

export const tezosWallets = [
  {
    name: "Web3Auth",
    logo: "web3auth.svg",
    recommended: true,
  },
  {
    name: "Temple Wallet",
    logo: "tezos/temple_wallet.jpg",
    recommended: false,
  },
  // {
  //   name: "Spire",
  //   logo: "tezos/spire.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Galleon",
  //   logo: "tezos/galleon.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Kukai Wallet",
  //   logo: "tezos/kukai_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Umami",
  //   logo: "tezos/umami.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "AirGap Wallet",
  //   logo: "tezos/aircap_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Autonomy:Digital Art Wallet",
  //   logo: "tezos/autonomy_digital_art_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Naan Wallet",
  //   logo: "tezos/naan_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Temple Wallet",
  //   logo: "tezos/temple_wallet_ios.jpg",
  //   recommended: false,
  // },
];

export const aptosWallets = [
  {
    name: "Web3Auth",
    logo: "web3auth.svg",
    recommended: true,
  },
  {
    name: "Hippo",
    logo: "aptos/hippo_wallet.jpg",
    recommended: false,
  },
  {
    name: "Martian",
    logo: "aptos/martianwallet.png",
    recommended: false,
  },
  // {
  //   name: "Aptos",
  //   logo: "aptos/aptos.jpg",
  //   recommended: false,
  // },
  {
    name: "Fewcha",
    logo: "aptos/fewcha_move_wallet.png",
    recommended: false,
  },
  // {
  //   name: "Hippo Extension Wallet",
  //   logo: "aptos/hippo_extension_wallet.jpg",
  //   recommended: false,
  // },
  {
    name: "Pontem",
    logo: "aptos/pontem_wallet.jpg",
    recommended: false,
  },
  {
    name: "Spika",
    logo: "aptos/spika.png",
    recommended: false,
  },
  // {
  //   name: "Rise",
  //   logo: "aptos/rise_wallet.jpg",
  //   recommended: false,
  // },
  {
    name: "Fletch",
    logo: "aptos/fletch_wallet.jpg",
    recommended: false,
  },
  {
    name: "TokenPocket",
    logo: "aptos/tokenpocket_wallet.jpg",
    recommended: false,
  },
  {
    name: "ONTO",
    logo: "aptos/onto_wallet.jpg",
    recommended: false,
  },
  {
    name: "Blocto",
    logo: "aptos/blocto_wallet.jpg",
    recommended: false,
  },
  {
    name: "SafePal",
    logo: "aptos/safepal.jpg",
    recommended: false,
  },
  // {
  //   name: "Fox",
  //   logo: "aptos/fox_wallet.png",
  //   recommended: false,
  // },
];