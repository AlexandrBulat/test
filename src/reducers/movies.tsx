import { TypeKeys } from "../constants/TypeKeys";
import { ActionTypes } from "../actions";
import { combineReducers } from "redux";
import { createSelector } from "reselect"
import { MoviesState, NormalizedObject } from "./types";
import { Movie } from "../types";

const ids = (state: number[] = [], action: ActionTypes): number[] => {
    switch (action.type) {
        case TypeKeys. MOVIES_FETCH_FULFILLED:
            const { movies } = action
            return [...movies.ids]
        default:
            return state
    }
}

const byIds = (state: { [id: string]: Movie } = {}, action: ActionTypes): { [id: string]: Movie } => {
    switch (action.type) {
        case TypeKeys. MOVIES_FETCH_FULFILLED:
            const { movies } = action
            return { ...movies.byIds }
        default:
            return state
    }
}

const loading = (state: boolean = false, action: ActionTypes): boolean => {
    switch (action.type) {
        case TypeKeys.MOVIES_FETCH:
            return true
        case TypeKeys.MOVIES_FETCH_FAILED:
        case TypeKeys. MOVIES_FETCH_FULFILLED:
            return false
        default:
            return state
    }
}

const error = (state: Error | null = null, action: ActionTypes): Error | null => {
    switch (action.type) {
        case TypeKeys. MOVIES_FETCH_FULFILLED:
        case TypeKeys.MOVIES_FETCH:
            return null
        case TypeKeys.MOVIES_FETCH_FAILED:
            return action.error
        default:
            return state
    }
}

export default combineReducers<MoviesState>({
    byIds,
    ids,
    loading,
    error
})

export const getMovies = createSelector(
    [
        (state: NormalizedObject<Movie>) => state.ids,
        (state: NormalizedObject<Movie>) => state.byIds
    ],
    (ids: number[], byIds: { [id: string]: Movie }) => ids.map(id => byIds[id])
)

export const isLoading = (state: MoviesState): boolean => {
    return state.loading
}

export const getError = (state: MoviesState): Error | null => {
    return state.error
}