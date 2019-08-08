import {
    MoviesFetchAction,
    MoviesFetchFulfilledAction,
    MoviesFetchFailedAction,
} from "./movies";
import {
    MovieFetchAction,
    MovieFetchFulfilledAction,
    MovieFetchFailedAction
} from "./movie";

export * from "./movies";
export * from "./movie";

export type ActionTypes =
    | MoviesFetchAction
    | MoviesFetchFulfilledAction
    | MoviesFetchFailedAction
    | MovieFetchAction
    | MovieFetchFulfilledAction
    | MovieFetchFailedAction