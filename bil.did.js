export const idlFactory = ({ IDL }) => {
    const TransactionArgs = IDL.Record({
      'recipient' : IDL.Principal,
      'amount' : IDL.Nat64,
    });
    const Hash = IDL.Nat;
    const Transaction = IDL.Record({
      'recipient' : IDL.Principal,
      'sender' : IDL.Principal,
      'timestamp' : IDL.Nat64,
      'amount' : IDL.Nat64,
    });
    const BlockHeader = IDL.Record({
      'height' : IDL.Nat64,
      'difficulty' : IDL.Nat32,
      'prev_hash' : Hash,
      'version' : IDL.Nat32,
      'merkle_root' : Hash,
      'timestamp' : IDL.Nat64,
    });
    const Block = IDL.Record({
      'hash' : Hash,
      'nonce' : IDL.Nat,
      'transactions' : IDL.Vec(Transaction),
      'header' : BlockHeader,
    });
    const Stats = IDL.Record({
      'miner' : IDL.Principal,
      'cycles_burned' : IDL.Nat64,
      'solve_time' : IDL.Nat64,
      'timestamp' : IDL.Nat64,
    });
    const LeaderBoardEntry = IDL.Record({
      'owner' : IDL.Principal,
      'block_count' : IDL.Nat64,
      'miner_count' : IDL.Nat64,
    });
    const SpawnRequest = IDL.Record({
      'id' : IDL.Nat64,
      'block_index' : IDL.Nat64,
      'timestamp' : IDL.Nat64,
      'caller' : IDL.Principal,
    });
    const State = IDL.Record({
      'average_block_time' : IDL.Nat64,
      'current_block' : IDL.Opt(Block),
      'updated_miners' : IDL.Vec(IDL.Principal),
      'spawners' : IDL.Vec(IDL.Principal),
      'exe_burned' : IDL.Nat64,
      'miner_to_spawner' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Principal)),
      'miner_to_owner' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Principal)),
      'current_difficulty' : IDL.Nat32,
      'spawn_queue' : IDL.Vec(SpawnRequest),
      'miner_spawn_enabled' : IDL.Bool,
      'transaction_count' : IDL.Nat64,
      'bil_ledger_id' : IDL.Principal,
      'block_height' : IDL.Nat64,
      'miner_to_mined_block' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
    });
    return IDL.Service({
      'create_transaction' : IDL.Func(
          [TransactionArgs],
          [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
          [],
        ),
      'get_all_blocks' : IDL.Func([], [IDL.Vec(Block)], ['query']),
      'get_all_stats' : IDL.Func([], [IDL.Vec(Stats)], ['query']),
      'get_balance_of' : IDL.Func([IDL.Principal], [IDL.Nat64], ['query']),
      'get_current_block' : IDL.Func([], [IDL.Opt(Block)], ['query']),
      'get_current_rewards' : IDL.Func([], [IDL.Nat64], ['query']),
      'get_difficulty' : IDL.Func([], [IDL.Nat32], ['query']),
      'get_latest_block' : IDL.Func([], [IDL.Opt(Block)], ['query']),
      'get_leaderboard' : IDL.Func([], [IDL.Vec(LeaderBoardEntry)], ['query']),
      'get_mempool' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
      'get_miner_count' : IDL.Func([], [IDL.Nat64], ['query']),
      'get_miners' : IDL.Func(
          [IDL.Principal],
          [IDL.Vec(IDL.Principal)],
          ['query'],
        ),
      'get_next_halving' : IDL.Func([], [IDL.Nat64], ['query']),
      'get_state' : IDL.Func([], [State], ['query']),
      'get_stats' : IDL.Func([IDL.Nat64], [IDL.Opt(Stats)], ['query']),
      'spawn_miner' : IDL.Func(
          [IDL.Nat64],
          [IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text })],
          [],
        ),
      'topup_miner' : IDL.Func(
          [IDL.Principal, IDL.Nat64],
          [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
          [],
        ),
      'update_miner' : IDL.Func(
          [IDL.Principal, IDL.Principal],
          [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
          [],
        ),
    });
  };
  export const init = ({ IDL }) => { return []; };