import { fromTheme } from 'tailwind-merge';

const SNOWSCAN_API_URL = 'https://api.snowtrace.io/api';
const SNOWSCAN_API_KEY = process.env.SNOWSCAN_API_KEY || 'YourSnowScanApiKeyHere';

class RateLimitForApiToBlockExplorers {
    private calls : number[] = [];
    // Max calls per minute will have tiers
    private maxCallsPerMinute: number = 5;
    private timeWindow: number = 6000;

    async waitForNextSlot(): Promise<void> {
        const now = Date.now();
        this.calls = this.calls.filter(time => now - time < this.timeWindow)

        if(this.calls.length >= this.maxCallsPerMinute) {
            const oldestCall = Math.min(...this.calls);
            const waitTime = this.timeWindow - (now - oldestCall) + 100
            await new Promise(resolve => setTimeout(resolve, waitTime))
            return this.waitForNextSlot();
    }
    this.calls.push(now);
}
}

const rateLimiter = new RateLimitForApiToBlockExplorers();

export interface TokenInfo {
    conatractAddress: string;
    tokenName: string;
    symbol: string;
    divisor: string;
    tokenType: string;
    totalSupply: string;
    verifiedContract: boolean;
    description: string;
    website: string;
    email: string;
    twitter: string;
    blueCheckmark: boolean;
    discord: string;
    github: string;
    whitepaper: string;
    tokenPriceUSD: string;
    holdersCount: string;
}

export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string
    value: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    error: string;
    input: string;
    confirmations: string;    
}

export interface TokenHolder {
    TokenHolderAddress: string;
    TokenHolderQuantity: string;    
}

export class SnowscanClient {
    private apikey: string;
    private apiUrl: string;

    constructor(apikey: string = SNOWSCAN_API_KEY) {
        this.apikey = apikey;
        this.apiUrl = SNOWSCAN_API_URL;
    }
    private async makeRequest(params: Record<string, string>): 
     Promise<any> {
        await rateLimiter.waitForNextSlot();

        const url = new URL(SNOWSCAN_API_URL)
        url.searchParams.append('apikey', this.apikey);

        Object.entries(params).forEach(([Key, value]) => {
            url.searchParams.append(Key, value);
        })
        const response = await fetch(url.toString())

         if(!response.ok) {
            throw new Error(`Snowscan API error: ${response.statusText}`)

         }   
         const data = await response.json();

         if(data.status !== '1') {
            throw new Error(`Snowscan API error: ${data.message}`)

         }
            return data.result;
        }
    async getTokenInfo(contractAddress: string): Promise<TokenInfo | null> {
        try {
            const result = await this.makeRequest({
                module: 'token',
                action: 'getTokenInfo',
                contractaddress: contractAddress,
            })
            return result[0] || null;
        } catch(error) {
            console.error(`Error fetching token info for ${contractAddress}:`, error);
            return null;
        }
        
    }
     async getTokenTransfers(
    contractAddress: string, 
    address?: string,
    startblock: string = '0',
    endblock: string = 'latest',
    page: number = 1,
    offset: number = 100
  ): Promise<Transaction[]> {
    try {
      const params: Record<string, string> = {
        module: 'account',
        action: 'tokentx',
        contractaddress: contractAddress,
        startblock,
        endblock,
        page: page.toString(),
        offset: offset.toString(),
        sort: 'desc'
      }

      if (address) {
        params.address = address
      }

      const result = await this.makeRequest(params)
      return result || []
    } catch (error) {
      console.error('Error fetching token transfers:', error)
      return []
    }
  }
  async getTokenHolders(contractAddress: string, page: number = 1, offset: number = 10): Promise<TokenHolder[]> {
    try {
      const result = await this.makeRequest({
        module: 'token',
        action: 'tokenholderlist',
        contractaddress: contractAddress,
        page: page.toString(),
        offset: offset.toString()
      })
      return result || []
    } catch (error) {
      console.error('Error fetching token holders:', error)
      return []
    }
  }
  async getContractABI(contractAddress: string): Promise<string | null> {
    try {
      const result = await this.makeRequest({
        module: 'contract',
        action: 'getabi',
        address: contractAddress
      })
      return result
    } catch (error) {
      console.error('Error fetching contract ABI:', error)
      return null
    }
  }
   async getContractSource(contractAddress: string): Promise<any> {
    try {
      const result = await this.makeRequest({
        module: 'contract',
        action: 'getsourcecode',
        address: contractAddress
      })
      return result[0] || null
    } catch (error) {
      console.error('Error fetching contract source:', error)
      return null
    }
  }
   async getBalance(address: string): Promise<string> {
    try {
      const result = await this.makeRequest({
        module: 'account',
        action: 'balance',
        address: address,
        tag: 'latest'
      })
      return result
    } catch (error) {
      console.error('Error fetching balance:', error)
      return '0'
    }
  }
  async getTransactions(
    address: string,
    startblock: string = '0',
    endblock: string = 'latest',
    page: number = 1,
    offset: number = 10
  ): Promise<Transaction[]> {
    try {
      const result = await this.makeRequest({
        module: 'account',
        action: 'txlist',
        address: address,
        startblock,
        endblock,
        page: page.toString(),
        offset: offset.toString(),
        sort: 'desc'
      })
      return result || []
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }
}
export const snowscanClient = new SnowscanClient(SNOWSCAN_API_KEY);
