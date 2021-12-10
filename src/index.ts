import {PriceGetter} from './priceGetter'
import {DbClient} from './mongoClient'
import {TokenList} from './tokenList'
import dotenv from 'dotenv'


async function RunJob() {
	try {
		dotenv.config()

	}
	catch {
		console.log('Using real env')
	}

	const tokenlist = new TokenList()
	if (process.env.DB_CONNECTION_STRING){
		const mongoClient = new DbClient(process.env.DB_CONNECTION_STRING)
		const processor = new PriceGetter('mainnet-beta',mongoClient,tokenlist)

		await tokenlist.LoadData()
		await mongoClient.Connect()
		await mongoClient.InitDb()

		await processor.start()
 
	} else {
		console.error('No DB_CONNECTION_STRING environment variable')
	}
	
    
}

RunJob()
