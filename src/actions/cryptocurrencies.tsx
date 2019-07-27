import { TypeKeys } from "../constants/TypeKeys";
import { Action } from "redux";
import { NormalizedObject } from "../reducers/types";
import { Cryptocurrency } from "../types";

export interface CryptocurrenciesFetchAction extends Action {
    type: TypeKeys.CRYPTOCURRENCIES_FETCH;
    page: number | undefined
}

export interface CryptocurrenciesFetchFulfilledAction extends Action {
    type: TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED;
    cryptocurrencies: NormalizedObject<Cryptocurrency>
}

export interface CryptocurrenciesFetchFailedAction extends Action {
    type: TypeKeys.CRYPTOCURRENCIES_FETCH_FAILED;
    error: Error
}

export const fetchCryptocurrencies = (page?: number): CryptocurrenciesFetchAction => ({
    type: TypeKeys.CRYPTOCURRENCIES_FETCH,
    page
});

export const fetchCryptocurrenciesFulfilled = (cryptocurrencies: NormalizedObject<Cryptocurrency>): CryptocurrenciesFetchFulfilledAction => ({
    type: TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED,
    cryptocurrencies
});

export const fetchCryptocurrenciesFailed = (error: Error): CryptocurrenciesFetchFailedAction => ({
    type: TypeKeys.CRYPTOCURRENCIES_FETCH_FAILED,
    error
});