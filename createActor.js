import { Actor } from '@dfinity/agent';

export const createActor = (canisterId, idlFactory, agent) => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
