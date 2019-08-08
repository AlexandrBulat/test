import { TypeKeys } from "../constants/TypeKeys";
import { Action } from "redux";
import { NormalizedObject } from "../reducers/types";
import { Movie } from "../types";

export interface MoviesFetchAction extends Action {
    type: TypeKeys.MOVIES_FETCH;
}

export interface MoviesFetchFulfilledAction extends Action {
    type: TypeKeys. MOVIES_FETCH_FULFILLED;
    movies: NormalizedObject<Movie>
}

export interface MoviesFetchFailedAction extends Action {
    type: TypeKeys.MOVIES_FETCH_FAILED;
    error: Error
}

export const fetchMovies = (): MoviesFetchAction => ({
    type: TypeKeys.MOVIES_FETCH
});

export const fetchMoviesFulfilled = (movies: NormalizedObject<Movie>): MoviesFetchFulfilledAction => ({
    type: TypeKeys. MOVIES_FETCH_FULFILLED,
    movies
});

export const fetchMoviesFailed = (error: Error): MoviesFetchFailedAction => ({
    type: TypeKeys.MOVIES_FETCH_FAILED,
    error
});