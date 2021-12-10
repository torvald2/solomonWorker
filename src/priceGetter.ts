
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js'
import { getPythProgramKeyForCluster, PriceData, Product, PythConnection } from '@pythnetwork/client'
import {DbClient} from './mongoClient'
import {TokenList} from './tokenList'
export  class PriceGetter{
	private solanaCluster:Cluster 
	private pythConnection: PythConnection
	private mongoClient: DbClient
	private tokenList: TokenList

	constructor(cluster:string, client:DbClient, tokenList:TokenList){
		this.solanaCluster = cluster as Cluster
		const connection = new Connection(clusterApiUrl(this.solanaCluster))
		const pythPublicKey = getPythProgramKeyForCluster(this.solanaCluster)
		this.pythConnection = new PythConnection(connection, pythPublicKey)
		this.mongoClient = client
		this.tokenList = tokenList
	}

	async start () {
		await this.pythConnection.start()
		this.pythConnection.onPriceChange(async(product: Product, price: PriceData) => {
			const quote = product.symbol.split('/')[0]
			const tokens =  this.tokenList.GetToken(quote.toLowerCase())
			if (tokens[0]){
				if (price.price && price.confidence){
					await this.mongoClient.InsertPrice(tokens[0],price.price, product.symbol)
				}
			} 
			
		})
    
	}
}

