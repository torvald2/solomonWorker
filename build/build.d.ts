declare module "calcPrice" {
    export default function (price: number, exp: number, conf: number): number;
}
declare module "tokenList" {
    export interface Token {
        name: string;
        symbol: string;
        image: string;
        address: string;
    }
    export class TokenList {
        private data;
        constructor();
        LoadData(): Promise<void>;
        GetToken(symbol: string): Token[];
    }
}
declare module "mongoClient" {
    import { Token } from "tokenList";
    export class DbClient {
        private mongoClient;
        constructor(connectionString: string);
        Connect(): Promise<void>;
        InitDb(): Promise<void>;
        InsertPrice(token: Token, price: number, pair: string): Promise<void>;
    }
}
declare module "priceGetter" {
    import { DbClient } from "mongoClient";
    import { TokenList } from "tokenList";
    export class PriceGetter {
        private solanaCluster;
        private pythConnection;
        private mongoClient;
        private tokenList;
        constructor(cluster: string, client: DbClient, tokenList: TokenList);
        start(): Promise<void>;
    }
}
declare module "index" { }
