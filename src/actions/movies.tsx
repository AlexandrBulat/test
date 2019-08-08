import { TypeKeys } from "../constants/TypeKeys";
import { Action } from "redux";
import { Movie } from "../types";

export interface MoviesFetchAction extends Action {
    type: TypeKeys.MOVIES_FETCH;
}

export interface MoviesFetchFulfilledAction extends Action {
    type: TypeKeys.MOVIES_FETCH_FULFILLED;
    byIds: {
        [key: number]: Movie
    }
    popularIds: number[]
    topRatedIds: number[]
    upcomingIds: number[]
}

export interface MoviesFetchFailedAction extends Action {
    type: TypeKeys.MOVIES_FETCH_FAILED;
    error: Error
}

export const fetchMovies = (): MoviesFetchAction => ({
    type: TypeKeys.MOVIES_FETCH
});

export const fetchMoviesFulfilled = (
    byIds: { [key: number]: Movie },
    popularIds: number[],
    topRatedIds: number[],
    upcomingIds: number[]): MoviesFetchFulfilledAction => ({
        type: TypeKeys.MOVIES_FETCH_FULFILLED,
        byIds,
        popularIds,
        topRatedIds,
        upcomingIds
    });

export const fetchMoviesFailed = (error: Error): MoviesFetchFailedAction => ({
    type: TypeKeys.MOVIES_FETCH_FAILED,
    error
});