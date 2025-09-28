import Web3 from 'web3';
import { BLOCKCHAIN_CONFIG } from '../config/constants';

// Smart Contract ABI for Ayurvedic Traceability
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_collectionId", "type": "string"},
      {"name": "_herbId", "type": "string"},
      {"name": "_collectorId", "type": "string"},
      {"name": "_latitude", "type": "string"},
      {"name": "_longitude", "type": "string"},
      {"name": "_quantity", "type": "uint256"},
      {"name": "_ipfsHash", "type": "string"}
    ],
    "name": "recordCollection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "_processingId", "type": "string"},
      {"name": "_collectionId", "type": "string"},
      {"name": "_processorId", "type": "string"},
      {"name": "_processType", "type": "string"},
      {"name": "_parameters", "type": "string"},
      {"name": "_ipfsHash", "type": "string"}
    ],
    "name": "recordProcessing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "_batchId", "type": "string"},
      {"name": "_productName", "type": "string"},
      {"name": "_manufacturerId", "type": "string"},
      {"name": "_inputCollectionIds", "type": "string[]"},
      {"name": "_quantity", "type": "uint256"},
      {"name": "_ipfsHash", "type": "string"}
    ],
    "name": "recordFormulation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_collectionId", "type": "string"}],
    "name": "getCollection",
    "outputs": [
      {"name": "herbId", "type": "string"},
      {"name": "collectorId", "type": "string"},
      {"name": "latitude", "type": "string"},
      {"name": "longitude", "type": "string"},
      {"name": "quantity", "type": "uint256"},
      {"name": "timestamp", "type": "uint256"},
      {"name": "ipfsHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "_batchId", "type": "string"}],
    "name": "getFormulation",
    "outputs": [
      {"name": "productName", "type": "string"},
      {"name": "manufacturerId", "type": "string"},
      {"name": "inputCollectionIds", "type": "string[]"},
      {"name": "quantity", "type": "uint256"},
      {"name": "timestamp", "type": "uint256"},
      {"name": "ipfsHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export class RealBlockchainService {
  private web3: Web3;
  private contract: any;
  private account: string | null = null;

  constructor() {
    // Initialize Web3 with Polygon Mumbai testnet
    this.web3 = new Web3(BLOCKCHAIN_CONFIG.networkUrl);
    this.contract = new this.web3.eth.Contract(CONTRACT_ABI, BLOCKCHAIN_CONFIG.contractAddress);
  }

  async connectWallet(): Promise<string> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
        
        // Switch to Polygon Mumbai if needed
        await this.switchToPolygonMumbai();
        
        return this.account;
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        throw new Error('Failed to connect wallet');
      }
    } else {
      throw new Error('MetaMask not installed');
    }
  }

  private async switchToPolygonMumbai() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // Polygon Mumbai
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Add Polygon Mumbai network
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13881',
            chainName: 'Polygon Mumbai Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          }]
        });
      }
    }
  }

  async recordCollection(data: {
    collectionId: string;
    herbId: string;
    collectorId: string;
    latitude: string;
    longitude: string;
    quantity: number;
    ipfsHash: string;
  }): Promise<string> {
    if (!this.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const tx = await this.contract.methods.recordCollection(
        data.collectionId,
        data.herbId,
        data.collectorId,
        data.latitude,
        data.longitude,
        data.quantity,
        data.ipfsHash
      ).send({
        from: this.account,
        gas: BLOCKCHAIN_CONFIG.gasLimit,
        gasPrice: gasPrice
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Failed to record collection:', error);
      throw new Error('Failed to record collection on blockchain');
    }
  }

  async recordProcessing(data: {
    processingId: string;
    collectionId: string;
    processorId: string;
    processType: string;
    parameters: string;
    ipfsHash: string;
  }): Promise<string> {
    if (!this.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const tx = await this.contract.methods.recordProcessing(
        data.processingId,
        data.collectionId,
        data.processorId,
        data.processType,
        data.parameters,
        data.ipfsHash
      ).send({
        from: this.account,
        gas: BLOCKCHAIN_CONFIG.gasLimit,
        gasPrice: gasPrice
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Failed to record processing:', error);
      throw new Error('Failed to record processing on blockchain');
    }
  }

  async recordFormulation(data: {
    batchId: string;
    productName: string;
    manufacturerId: string;
    inputCollectionIds: string[];
    quantity: number;
    ipfsHash: string;
  }): Promise<string> {
    if (!this.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const tx = await this.contract.methods.recordFormulation(
        data.batchId,
        data.productName,
        data.manufacturerId,
        data.inputCollectionIds,
        data.quantity,
        data.ipfsHash
      ).send({
        from: this.account,
        gas: BLOCKCHAIN_CONFIG.gasLimit,
        gasPrice: gasPrice
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Failed to record formulation:', error);
      throw new Error('Failed to record formulation on blockchain');
    }
  }

  async getCollection(collectionId: string): Promise<any> {
    try {
      const result = await this.contract.methods.getCollection(collectionId).call();
      return {
        herbId: result.herbId,
        collectorId: result.collectorId,
        latitude: result.latitude,
        longitude: result.longitude,
        quantity: result.quantity,
        timestamp: new Date(parseInt(result.timestamp) * 1000),
        ipfsHash: result.ipfsHash
      };
    } catch (error) {
      console.error('Failed to get collection:', error);
      throw new Error('Failed to retrieve collection from blockchain');
    }
  }

  async getFormulation(batchId: string): Promise<any> {
    try {
      const result = await this.contract.methods.getFormulation(batchId).call();
      return {
        productName: result.productName,
        manufacturerId: result.manufacturerId,
        inputCollectionIds: result.inputCollectionIds,
        quantity: result.quantity,
        timestamp: new Date(parseInt(result.timestamp) * 1000),
        ipfsHash: result.ipfsHash
      };
    } catch (error) {
      console.error('Failed to get formulation:', error);
      throw new Error('Failed to retrieve formulation from blockchain');
    }
  }

  async getTransactionReceipt(txHash: string): Promise<any> {
    try {
      return await this.web3.eth.getTransactionReceipt(txHash);
    } catch (error) {
      console.error('Failed to get transaction receipt:', error);
      throw new Error('Failed to get transaction receipt');
    }
  }

  getAccount(): string | null {
    return this.account;
  }

  isConnected(): boolean {
    return this.account !== null;
  }
}

export const realBlockchainService = new RealBlockchainService();