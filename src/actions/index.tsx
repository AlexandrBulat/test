import {
    MoviesFetchAction,
    MoviesFetchFulfilledAction,
    MoviesFetchFailedAction
} from "./movies";

export * from "./movies";

export type ActionTypes =
    | MoviesFetchAction
    | MoviesFetchFulfilledAction
    | MoviesFetchFailedAction