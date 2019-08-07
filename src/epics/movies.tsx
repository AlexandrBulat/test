import { TypeKeys } from '../constants/TypeKeys';
import {
    catchError,
    map,
    switchMap,
    takeUntil
} from 'rxjs/operators'
import { of, timer } from 'rxjs'
import { Epic, ofType } from "redux-observable";
import {
    fetchMoviesFulfilled,
    fetchMoviesFailed
} from '../actions';
import { NormalizedObject } from '../reducers/types';
import { Movie } from '../types';
import { IDependencies } from '.';

export const fecthMovies: Epic = (action$, _, { apiService }: IDependencies) => {
    const stopPolling$ = action$.pipe(
        ofType(TypeKeys.MOVIES_FETCH_STOP)
    )
    return action$.pipe(
        ofType(TypeKeys.MOVIES_FETCH),
        switchMap(() => {
            return timer(0, 60 * 1000).pipe(
                takeUntil(stopPolling$),
                switchMap(() => {
                    return apiService.getMovies().pipe(
                        map((cryptocurrencies: NormalizedObject<Movie>) => fetchMoviesFulfilled(cryptocurrencies)),
                        catchError((error: Error) => of(fetchMoviesFailed(error)))
                    )
                })
            )
        })
    )
}



