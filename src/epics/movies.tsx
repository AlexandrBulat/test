import { TypeKeys } from '../constants/TypeKeys';
import {
    catchError,
    map,
    switchMap,
} from 'rxjs/operators'
import { of, zip } from 'rxjs'
import { Epic, ofType } from "redux-observable";
import {
    fetchMoviesFulfilled,
    fetchMoviesFailed,
    MovieFetchAction,
    fetchMovieFulfilled,
    fetchMovieFailed
} from '../actions';
import { NormalizedObject } from '../reducers/types';
import { Movie } from '../types';
import { IDependencies } from '.';
import { MovieCategory } from '../services';

export const fecthMovies: Epic = (action$, _, { apiService }: IDependencies) => {
    return action$.pipe(
        ofType(TypeKeys.MOVIES_FETCH),
        switchMap(() => {
            const popularRequest = apiService.getMovies(MovieCategory.Popular)
            const topRequest = apiService.getMovies(MovieCategory.Top)
            const upcomingRequest = apiService.getMovies(MovieCategory.Upcoming)
            return zip(popularRequest, topRequest, upcomingRequest).pipe(
                map((movies: [NormalizedObject<Movie>, NormalizedObject<Movie>, NormalizedObject<Movie>]) => {
                    const popular = movies[0]
                    const top = movies[1]
                    const upcoming = movies[2]
                    return fetchMoviesFulfilled(
                        { ...popular.byIds, ...top.byIds, ...upcoming.byIds },
                        popular.ids,
                        top.ids,
                        upcoming.ids)
                }),
                catchError((error: Error) => of(fetchMoviesFailed(error)))
            )
        })
    )
}

export const fecthMovie: Epic = (action$, _, { apiService }: IDependencies) => {
    return action$.pipe(
        ofType(TypeKeys.MOVIE_FETCH),
        switchMap((action: MovieFetchAction) => {
            return apiService.getMovie(action.id).pipe(
                map((movie: Movie) => fetchMovieFulfilled(movie)),
                catchError((error: Error) => of(fetchMovieFailed(error)))
            )
        })
    )
}