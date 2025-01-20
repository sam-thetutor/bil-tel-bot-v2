export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addTelegramGroupCode' : IDL.Func([IDL.Text], [], []),
    'getTelegramGroupCodes' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getTestNumber' : IDL.Func([], [IDL.Nat], ['query']),
    'incrementTestNumber' : IDL.Func([], [], []),
    'removeTelegramGroupCode' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };