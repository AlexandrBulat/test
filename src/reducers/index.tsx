import { combineReducers } from 'redux'
import { Cryptocurrency } from '../types';
import { State } from './types';
import cryptocurrencies, * as fromCrypto from './cryptocurrencies'

const reducers = combineReducers<State>({
   cryptocurrencies
})

export const getCryptocurrencies = (state: State): Cryptocurrency[] => 
   fromCrypto.getCryptocurrencies(state.cryptocurrencies)
export const isLoading = (state: State): boolean => fromCrypto.isLoading(state.cryptocurrencies)
export const getError = (state: State): Error | undefined => fromCrypto.getError(state.cryptocurrencies)

export default reducers