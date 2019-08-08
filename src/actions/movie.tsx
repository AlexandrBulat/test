import { TypeKeys } from "../constants/TypeKeys";
import { Action } from "redux";
import { Movie } from "../types";

export interface MovieFetchAction extends Action {
    type: TypeKeys.MOVIE_FETCH;
    id: number;
}

export interface MovieFetchFulfilledAction extends Action {
    type: TypeKeys.MOVIE_FETCH_FULFILLED;
    movie: Movie
}

export interface MovieFetchFailedAction extends Action {
    type: TypeKeys.MOVIE_FETCH_FAILED;
    error: Error
}

export const fetchMovie = (id: number): MovieFetchAction => ({
    type: TypeKeys.MOVIE_FETCH,
    id
});

export const fetchMovieFulfilled = (movie: Movie): MovieFetchFulfilledAction => ({
    type: TypeKeys.MOVIE_FETCH_FULFILLED,
    movie
});

export const fetchMovieFailed = (error: Error): MovieFetchFailedAction => ({
    type: TypeKeys.MOVIE_FETCH_FAILED,
    error
});