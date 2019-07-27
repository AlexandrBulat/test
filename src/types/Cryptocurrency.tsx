export enum Converter {
    USD = "uSD",
    BTC = "BTC"
}

export interface Cryptocurrency {
    readonly id: string
    readonly name: string
    readonly symbol: string
    readonly cmcRank: number
    readonly quote: {
        [Converter.BTC]?: Quote,
        [Converter.USD]?: Quote
    }
}

export interface Quote {
    readonly price: number
    readonly volume24h: number
    readonly percentChange1h: number
    readonly percentChange24h: number
    readonly percentChange7d: number
    readonly marketCap: number
}