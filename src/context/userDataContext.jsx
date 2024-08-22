import { ethers } from "ethers";
import { createContext, useState } from "react";

const UserDataContext = createContext(null);

export const UserDataProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refAddr, setRefAddr] = useState(ethers.constants.AddressZero);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenPriceForSwap, setTokenPriceForSwap] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dbTokenContractIns, setDbTokenContractIns] = useState();
  const [usdtContractIns, setUsdtContractIns] = useState();
  const [totalRef, setTotalRef] = useState(0);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [totalRefRewards, setTotalRefRewards] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [poolEntryFee, setPoolEntryFee] = useState(0);
  const [pool1Details, setPool1Details] = useState({});
  const [pool2Details, setPool2Details] = useState({});
  const [pool3Details, setPool3Details] = useState({});
  const [poolsHistory, setPoolsHistory] = useState([]);
  const [pool3Winners, setPool3Winners] = useState([]);
  const [poolRefCount, setPoolRefCount] = useState(0);
  const [refBonus, setRefBonus] = useState(0);
  const [totalAmountRefPurchase, setTotalAmountRefPurchase] = useState(0);

  const adminLogged = () => {
    setAdminLoggedIn(true);
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    refAddr,
    setRefAddr,
    tokenPrice,
    setTokenPrice,
    loading,
    setLoading,
    dbTokenContractIns,
    setDbTokenContractIns,
    usdtContractIns,
    setUsdtContractIns,
    totalRef,
    setTotalRef,
    adminLoggedIn,
    adminLogged,
    totalRefRewards,
    setTotalRefRewards,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    poolEntryFee,
    setPoolEntryFee,
    pool1Details,
    setPool1Details,
    pool2Details,
    setPool2Details,
    pool3Details,
    setPool3Details,
    poolsHistory,
    setPoolsHistory,
    tokenPriceForSwap,
    setTokenPriceForSwap,
    poolRefCount,
    setPoolRefCount,
    refBonus,
    setRefBonus,
    totalAmountRefPurchase,
    setTotalAmountRefPurchase,
    pool3Winners,
    setPool3Winners,
  };

  return (
    <UserDataContext.Provider value={value}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
