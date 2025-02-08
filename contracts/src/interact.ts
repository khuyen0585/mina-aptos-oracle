import { Mina, PrivateKey, PublicKey, fetchAccount } from 'o1js';
import { Add } from './Add'

const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');

Mina.setActiveInstance(Network);

const appKey = PublicKey.fromBase58(
  'B62qqaHNssPrp3Exw6xMmePiAqbX5HKeTYuyhFPsp5X2E27E4yqidJU'
  );

const zkApp = new Add(appKey);
await fetchAccount({ publicKey: appKey });
console.log(zkApp.num.get().toString());