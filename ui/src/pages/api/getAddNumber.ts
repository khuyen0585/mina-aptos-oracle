import type { NextApiRequest, NextApiResponse } from 'next';
import { Mina, PublicKey } from 'o1js';
import { Add } from '../../../../contracts/src/Add';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
    Mina.setActiveInstance(Network);

    const appKey = PublicKey.fromBase58('B62qmwn9NdY4iZxvkFPJxjg2PuD93tZfAQuvkAAkL3UTkNThwZ1eQfG');
    const zkApp = new Add(appKey);

    const number = await zkApp.num.get().toString();

    res.status(200).json({ number });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
