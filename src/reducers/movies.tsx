import { TypeKeys } from "../constants/TypeKeys";
import { ActionTypes } from "../actions";
import { combineReducers } from "redux";
import { createSelector } from "reselect"
import { MoviesState } from "./types";
import { Movie } from "../types";
import { MovieCategory } from "../services";

const ids = (state:{ [id: string]: number[] } = {}, action: ActionTypes): { [id: string]: number[] }  => {
    switch (action.type) {
        case TypeKeys. MOVIES_FETCH_FULFILLED:
            return {
                [MovieCategory.Popular]: action.popularIds,
                [MovieCategory.Top]: action.topRatedIds,
                [MovieCategory.Upcoming]: action.upcomingIds,
            }
        default:
            return state
    }
}

const byIds = (state: { [id: string]: Movie } = {}, action: ActionTypes): { [id: string]: Movie } => {
    switch (action.type) {
        case TypeKeys. MOVIES_FETCH_FULFILLED:
            return { ...action.byIds }
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
        case TypeKeys.MOVIES_FETCH_FULFILLED:
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

export const getIds = (state: MoviesState, category: MovieCategory): number[] => {
    return state.ids[category] || []
}

export const isLoading = (state: MoviesState): boolean => {
    return state.loading
}

export const getError = (state: MoviesState): Error | null => {
    return state.error
}