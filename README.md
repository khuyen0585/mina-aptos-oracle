<br />
<div align="center">
  <h3 align="center">Mina to Aptos Data Oracle</h3>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project


When it comes to bridging the gap between blockchains, there's always room for innovative solutions that enhance interoperability and facilitate a more inclusive blockchain ecosystem. While there are a multitude of bridges, oracles, and cross-chain services in existence, none seemed to perfectly fit the use case we're passionate about – creating a seamless data oracle between Mina Protocol and Aptos. That's why we created our very own oracle bridge, designed with simplicity and efficiency in mind.

The motivation for this project comes from the need for secure, reliable, and easy-to-use infrastructures that enable smart contracts on Aptos to leverage Mina Protocol's succinct blockchain data in a trustworthy manner. Here's why our project stands out:

* **Problem-solving:** Our oracle acts as a critical infrastructure piece, allowing developers to build applications that incorporate verified real-world data onto Aptos' highly scalable blockchain platform.
* **Efficiency:** We recognize that time is of the essence for developers, so we designed our oracle to be easy to implement, so you can spend less time setting up and more time innovating.
* **DRY Principle:** We believe in "Don't Repeat Yourself" not just in code but in every aspect of technology creation. This oracle is a testament to that philosophy – set it up once and use it as the backbone for all your cross-chain applications involving Mina and Aptos.

Thank you to all contributors who have helped kickstart this project and to those who will help it thrive in the times to come. Let's build the future of cross-chain communication together!

<!-- HOW IS WORKING -->
## How is working

<img
  src="https://imageupload.io/ib/2kgxpHg4zcUoY5U_1699540780.png"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; margin: 0 auto; max-width: 300px">

<!-- GETTING STARTED -->
## Getting Started

### Installation for Aptos Contract

1. Ensure you have brew installed https://brew.sh/

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Open a terminal and enter the following commands

   ```sh
    brew update        # Gets the latest updates for packages
    brew install aptos # Installs the Aptos CLI
   ```
3. You can now get help instructions by running ```aptos help``` You may have to open a new terminal window.
   ```sh
   aptos help
   ```
4. Get in the Aptos Module file.
   ```sh
   cd Aptos Module
   ```
5. Create Aptos wallet and send fund for module deployment.
   ```sh
   aptos init
   ```
6. Get in the ```.aptos/config.yaml``` and copy account address. Then get in the ```move.toml``` file. Finally paste '0x + address' to mina section in this file.
   ```js
    [package]
    name = "mina-oracle"
    version = "1.0.0"
    authors = []
    
    [addresses]
    mina = "0xYOUR_ADDRESS"
    
    [dev-addresses]
    
    [dependencies.AptosFramework]
    git = "https://github.com/aptos-labs/aptos-core.git"
    rev = "mainnet"
    subdir = "aptos-move/framework/aptos-framework"
    
    [dev-dependencies]
   ```
7. Finally deploy the module in the Network.
   ```sh
   aptos move publish
   ```

### Installation for Mina Contract


1. First, install the zkApp CLI:
   ```sh
   npm install -g zkapp-cli
   ```
2. Get in contracts folder.
   ```sh
   cd contracts
   ```
3. Configure your zkApp.
   ```sh
   zk config
   ```
4. Configure your zkApp.
   ```sh
   zk config
   ```
   use:
   - Deploy alias name: ```berkeley```
   - Mina GraphQL API URL: ```https://proxy.berkeley.minaexplorer.com/graphql```
   - Transaction fee to use when deploying: ```0.1```
   - Account to pay transaction fees: ```Create a new fee payer pair```
  
5. Fund your fee payer account.
   ```sh
   https://faucet.minaprotocol.com/?address=YOUR_ADDRESS&?explorer=minaexplorer
   ```
6. Deploy Mina contract.
   ```sh
   zk deploy
   ```

### Installation for Mina Contract
1. Get in ui folder.
   ```sh
   cd ui
   ```
  
2. Install node files.
   ```sh
   npm install
   ```
3. Run the website.
   ```sh
   npm run dev
   ```


