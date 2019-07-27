import { TypeKeys } from "../constants/TypeKeys";
import { ActionTypes } from "../actions";
import { combineReducers } from "redux";
import { createSelector } from "reselect"
import { CryptocurrenciesState, NormalizedObject } from "./types";
import { Cryptocurrency } from "../types";

const ids = (state: number[] = [], action: ActionTypes): number[] => {
    switch (action.type) {
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED:
            const { cryptocurrencies: cryptocurrencies } = action
            return [...cryptocurrencies.ids]
        default:
            return state
    }
}

const byIds = (state: { [id: string]: Cryptocurrency } = {}, action: ActionTypes): { [id: string]: Cryptocurrency } => {
    switch (action.type) {
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED:
            const { cryptocurrencies: cryptocurrencies } = action
            return { ...cryptocurrencies.byIds }
        default:
            return state
    }
}

const loading = (state: boolean = false, action: ActionTypes): boolean => {
    switch (action.type) {
        case TypeKeys.CRYPTOCURRENCIES_FETCH:
            return true
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FAILED:
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED:
            return false
        default:
            return state
    }
}

const error = (state: Error | null = null, action: ActionTypes): Error | null => {
    switch (action.type) {
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FULFILLED:
        case TypeKeys.CRYPTOCURRENCIES_FETCH:
            return null
        case TypeKeys.CRYPTOCURRENCIES_FETCH_FAILED:
            return action.error
        default:
            return state
    }
}

export default combineReducers<CryptocurrenciesState>({
    byIds,
    ids,
    loading,
    error
})

export const getCryptocurrencies = createSelector(
    [
        (state: NormalizedObject<Cryptocurrency>) => state.ids,
        (state: NormalizedObject<Cryptocurrency>) => state.byIds
    ],
    (ids: number[], byIds: { [id: string]: Cryptocurrency }) => ids.map(id => byIds[id])
)

export const isLoading = (state: CryptocurrenciesState): boolean => {
    return state.loading
}

export const getError = (state: CryptocurrenciesState): Error | null => {
    return state.error
}