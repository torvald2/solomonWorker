import axios from 'axios';

export interface Token {
    name:string,
    symbol:string,
    image:string,
	address:string,
	tags:String[],
}

export  class TokenList{
	private data:Token[]
	constructor(){
		this.data = []
	}
	async LoadData(){
		const res = await axios.get('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')
		for (const token of res.data.tokens){
			let tags = []
			if (token.tags){
				tags = token.tags

			}

			
           
			this.data.push({
				name:token.name,
				symbol:token.symbol,
				image:token.logoURI,
				address: token.address,
				tags:tags

			})
		}
	}
	GetToken(symbol:string){
		return this.data.filter(x=>{
			if (x.symbol.toLowerCase().includes(symbol)){
				return true
			}
			if (x.name.toLowerCase().includes(symbol)){
				return true

			}
			return false
		})
	}

}

