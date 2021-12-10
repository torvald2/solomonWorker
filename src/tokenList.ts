import axios from 'axios';

export interface Token {
    name:string,
    symbol:string,
    image:string,
	address:string
}

export  class TokenList{
	private data:Token[]
	constructor(){
		this.data = []
	}
	async LoadData(){
		const res = await axios.get('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')
		for (const token of res.data.tokens){
			this.data.push({
				name:token.name,
				symbol:token.symbol,
				image:token.logoURI,
				address: token.address
			})
		}
	}
	GetToken(symbol:string){
		return this.data.filter(x=>{
			return x.symbol.toLowerCase().indexOf(symbol)!=-1
		})
	}

}

