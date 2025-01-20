export const CLOUT_CANISTER_ID = "2dw2h-gyaaa-aaaam-qcu3a-cai";
export const BIL_BACKEND = "hx36f-waaaa-aaaai-aq32q-cai";
export const ANALYSER__BACKEND_CANISTER_ID = "nqjwu-oyaaa-aaaac-ae7oa-cai";
export const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export const TOPUP_CANISTER_ID = "nqjwu-oyaaa-aaaac-ae7oa-cai";
export const CHAT_BACKEND_CANISTER_ID = "4jork-6yaaa-aaaam-ad3vq-cai";


export const HOST = "https://ic0.app";




export   const convertTime = (timestamp) => {
    const date = new Date(Number(timestamp)/1e6);
    return date.toLocaleString(); // Adjust options as needed
  };

  export const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 12)}...${address.slice(-8)}`;
  };


  export const convertAccountIdtoHex=(array)=>{
  
      let rr = array.map(byte => byte.toString(16).padStart(2, '0')).join('');
      return "0x" + rr
  
  }

  export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };


export function isPrincipalOrAccount(address) {
  // Principal addresses typically contain dashes and are 63 characters long
  const principalRegex = /^[a-z0-9\-]{63}$/;
  
  // Account identifiers are typically 64 character hex strings
  const accountIdRegex = /^[a-f0-9]{64}$/;

  if (principalRegex.test(address)) {
    return "pa";
  } else if (accountIdRegex.test(address)) {
    return "ac";
  } else {
    return "unknown";
  }
}

export const formatRewardHistory = (rewardHistory) => {
  return rewardHistory.map(record => ({
    ...record,
    rewardTime: convertTime(record.rewardTime)
  }));
};