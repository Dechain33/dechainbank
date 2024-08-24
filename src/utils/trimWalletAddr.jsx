export const trimWallet = (str) => {
  if (str != undefined) {
    var res = str.slice(0, 5) + "...." + str.slice(37, 42);
    return res;
  }
};
