import { TypeKeys } from "../constants/TypeKeys";
import { ActionTypes } from "../actions";
import { combineReducers } from "redux";
import { MovieState } from "./types";
import { Movie } from "../types";

const movie = (state: Movie | null = null, action: ActionTypes): Movie | null => {
    switch (action.type) {
        case TypeKeys.MOVIE_FETCH:
            return null
        case TypeKeys.MOVIE_FETCH_FULFILLED:
            return { ...action.movie }
        default:
            return state
    }
}

const loading = (state: boolean = false, action: ActionTypes): boolean => {
    switch (action.type) {
        case TypeKeys.MOVIE_FETCH:
            return true
        case TypeKeys.MOVIE_FETCH_FAILED:
        case TypeKeys.MOVIE_FETCH_FULFILLED:
            return false
        default:
            return state
    }
}

const error = (state: Error | null = null, action: ActionTypes): Error | null => {
    switch (action.type) {
        case TypeKeys.MOVIE_FETCH_FULFILLED:
        case TypeKeys.MOVIE_FETCH:
            return null
        case TypeKeys.MOVIE_FETCH_FAILED:
            return action.error
        default:
            return state
    }
}

export default combineReducers<MovieState>({
    movie,
    loading,
    error
})

export const getMovie = (state: MovieState, id: number): Movie | null => state.movie && state.movie.id === id ? state.movie : null

export const isLoading = (state: MovieState): boolean => {
    return state.loading
}

export const getError = (state: MovieState): Error | null => {
    return state.error
}