import { NormalizedObject } from "./NormalizedObject";
import { Cryptocurrency } from "../../types";

export interface State {
   cryptocurrencies: CryptocurrenciesState
}

export interface CryptocurrenciesState extends NormalizedObject<Cryptocurrency> {
   loading: boolean
   error: Error | null
}