import { combineReducers } from 'redux'
import { Movie } from '../types';
import { State } from './types';
import movies, * as fromMovies from './movies'
import movie, * as fromMovie from './movie'
import { MovieCategory } from '../services';
import { createSelector } from 'reselect';

const reducers = combineReducers<State>({
   movies,
   movie
})

export const makeGetMovies = (): ((state: State, category: MovieCategory) => Movie[]) => {
   return createSelector(
       [
           (state: State, category: MovieCategory) => fromMovies.getIds(state.movies, category),
           (state: State) => state.movies.byIds
       ],
       (ids: number[], byIds: { [id: string]: Movie }) => ids && byIds ? ids.map(id => byIds[id]) : []
   )
}
export const isLoading = (state: State): boolean => fromMovies.isLoading(state.movies)
export const getError = (state: State): Error | null => fromMovies.getError(state.movies)

export const getMovie = (state: State, id: number) : Movie | null => fromMovie.getMovie(state.movie, id)

export default reducers