import {
    CryptocurrenciesFetchAction,
    CryptocurrenciesFetchFulfilledAction,
    CryptocurrenciesFetchFailedAction
} from "./cryptocurrencies";

export * from "./cryptocurrencies";

export type ActionTypes =
    | CryptocurrenciesFetchAction
    | CryptocurrenciesFetchFulfilledAction
    | CryptocurrenciesFetchFailedAction