import Web3 from "web3";
import axios from "axios";

export const checkEVMAddress = (address: string) => {
  return Web3.utils.isAddress(address);
};

export const checkEVMContract = async (address: string, provider: string) => {
  let web3 = new Web3(provider);
  const isContract = (await web3.eth.getCode(address)) !== "0x";
  return isContract;
};

export const getAbi = async (address: string, abiUrl: string) => {
  const response: any = await axios.get(`${abiUrl}${address}`);
  try {
    if (
      typeof response.data.result === "string" &&
      response.data.result.includes("Contract source code not verified")
    ) {
      return null;
    } else {
      const abi = JSON.parse(response.data.result);
      return abi;
    }
  } catch (error) {
    return null;
  }
};

export const getSymbol = async (
  address: string,
  provider: string,
  abi: any
) => {
  let web3 = new Web3(provider);
  const contract = new web3.eth.Contract(abi, address);
  const symbol = await contract.methods.symbol().call();
  return symbol;
};

export const getWriteAbleMethodsFromAbi = (abi: any) => {
  const wAbi = Object.values(abi).filter((item: any) => {
    if (item.type === "function" && item.stateMutability.includes("payable")) {
      item.label = item.name;
      item.value = item.name;
      if (item.stateMutability === "payable") {
        item.inputs = [
          {
            internalType: "uint256",
            name: "payableAmount",
            type: "uint256",
          },
        ].concat(item.inputs);
      }
      return item;
    }
    return false;
  });
  return wAbi;
};

export const getReadAbleMethodsFromAbi = (abi: any) => {
  const rAbi = Object.values(abi).filter((item: any) => {
    if (item.type === "function" && item.stateMutability.includes("view")) {
      item.label = item.name;
      item.value = item.name;
      return item;
    }
    return false;
  });

  return rAbi;
};

export const getParameters = (inputs: any[]) => {
  let params = [];
  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    params.push(element.value);
  }
  return params;
};

export const convertToTypeOf = (data: any) => {
    let type = typeof data;
    switch (type) {
      case "string":
        return data.toLowerCase();
      case "number":
        return data.toString().toLowerCase();
      case "boolean":
        return data ? 'true' : 'false'
      default:
        return "Unsupported type";
    }
  }