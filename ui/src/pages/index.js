
import Head from 'next/head';
import { useEffect, useState } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { Button } from 'antd';
import { AptosAccount, AptosClient } from 'aptos';



const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const MODULE_ADDRESS = "0x025a0ee2dd6a2f49539431c02c9195472e635ba49d1741ab09915847aa1d8055";
const APTOS_PRIVATE_KEY = "0x48aa93d355e10de63f9fe3e6f574243148a6bf9b308f249ecd08c8861be05fc9";


export default function Home() {
  const [loadings, setLoadings] = useState([]);
  const [minaData, setMinaData] = useState('0');
  const [aptosData, setAptosData] = useState('0');
  const [buttonText, setButtonText] = useState('Increase!')


  async function getAptosData() {
      const data = await new AptosClient(NODE_URL).view({
        function: `${MODULE_ADDRESS}::oracle::get_oracle_data`,
        type_arguments: [],
        arguments: [],
      });

      setAptosData(data);
  }

  useEffect(() => {
    (async () => {
      const { Mina, PrivateKey, PublicKey, fetchAccount, fromBase58 } = await import('o1js');
      const { Add } = await import('../../../contracts/build/src/Add.js');

      const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');

      Mina.setActiveInstance(Network);

      const appKey = PublicKey.fromBase58(
        'B62qqaHNssPrp3Exw6xMmePiAqbX5HKeTYuyhFPsp5X2E27E4yqidJU'
      );

      const zkApp = new Add(appKey);
      await fetchAccount({ publicKey: appKey });
      
      console.log(zkApp.num.get().toString())

    })();
    getAptosData();

  }, []);

  const IncreaseData = (index) => {
    
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    (async () => {
      const { Mina, PrivateKey, PublicKey, fetchAccount } = await import('o1js');
      const { Add } = await import('../../../contracts/build/src/');
  
      const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
  
      Mina.setActiveInstance(Network);
  
      const appKey = PublicKey.fromBase58(
        'B62qqaHNssPrp3Exw6xMmePiAqbX5HKeTYuyhFPsp5X2E27E4yqidJU'
      );
  
      const zkApp = new Add(appKey);
      await fetchAccount({ publicKey: appKey });
  
      const accountPrivateKey = PrivateKey.fromBase58(
        'EKFa9jAErAqp8rkbeuudnTJTBCgJsKvxhQXueqC4UHenunyFh8f4'
      );
      const accountPublicKey = accountPrivateKey.toPublicKey();

      setButtonText('Compiling...')
      await Add.compile();
      
  
      const tx = await Mina.transaction(
        { sender: accountPublicKey, fee: 0.1e9 },
        () => {
          zkApp.update();
        }
      );

      setButtonText('Prooving!')
      await tx.prove();
      const newData = (parseInt(zkApp.num.get()) + 1).toString();
      console.log(newData)

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });

      try {
        const sentTx = await tx.sign([accountPrivateKey]).send();
        console.log('https://berkeley.minaexplorer.com/transaction/' + sentTx.hash());
      } catch (error) {
        console.error(error);
      }

      setButtonText('Increase!')
    })();
  }
  

  return (
    <>
      <Head>
        <title>Mina to Aptos</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>
          <main className={styles.main}>
              <div className="flex h-screen">
                  <div className={styles.card}>
                    
                    <div className={styles.line}>
                          <p>Mina Data: {minaData}</p>

                          <Button className={styles.button} type="primary" loading={loadings[0]} onClick={() => IncreaseData(0)}>
                            {buttonText}
                          </Button>
                    </div>

                    <div className={styles.line}>
                          <p>Aptos Data: {aptosData}</p>
                    </div>
                    
                  
                  </div>
                </div>
            </main>
      </GradientBG>
    </>
  );
}
