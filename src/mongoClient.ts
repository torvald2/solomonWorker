import { MongoClient, } from 'mongodb';
import {Token} from './tokenList'

export class DbClient {
	private mongoClient:MongoClient
	constructor(connectionString:string){
		this.mongoClient = new MongoClient(connectionString)
	}

	async Connect(){
		await this.mongoClient.connect()
	}

	async InitDb(){
		const db =this.mongoClient.db('solana')
		try{
			await db.createCollection('ticker', {
				timeseries: {
					timeField: 'time',
					metaField: 'symbol',
				},
			})

		} catch {
			console.log('Ticker already created')
		}
	


	}

	async InsertPrice(token:Token, price:number, pair:string){

		const db =this.mongoClient.db('solana')
		const ticker = db.collection('ticker')
		const symbols = db.collection('symbols')
		try {
			const symbol = await symbols.findOne({'symbol':token.symbol})
			if (!symbol){
				const symbolInserted= await symbols.insertOne({
					'name':token.name,
					'symbol':token.symbol,
					'image':token.image,
					'pairs':[pair]
				})
				await ticker.insertOne({
					time: new Date(),
					symbol: symbolInserted.insertedId,
					price: price,
					pair: pair
				})} else {
				if (!symbol.pairs.includes(pair)){
					symbol.pairs.push(pair)
					await symbols.updateOne({'_id':symbol._id},{'$set':{'pairs':symbol.pairs}})
				}
				await ticker.insertOne({
					time: new Date(),
					symbol: symbol._id,
					price: price,
					pair: pair
				})
			}

		} catch (e) {
			console.error(e)
		}
		



	}
}