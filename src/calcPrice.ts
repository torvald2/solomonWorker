export default function(price:number,exp:number,conf:number){
	const normExp = 10^exp
	return Math.abs(price/normExp) + conf/normExp
}