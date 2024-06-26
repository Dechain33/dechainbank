import { ethers } from "ethers";

export const WeiToETH = (number) => {
  let newVal = ethers.utils.formatEther(number);
  return newVal;
};

export const ethToWei = (number) => {
  let newVal = ethers.utils.parseEther(number);
  return newVal;
};
