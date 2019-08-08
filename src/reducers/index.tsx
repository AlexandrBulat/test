import { combineReducers } from 'redux'
import { Movie } from '../types';
import { State } from './types';
import movies, * as fromMovie from './movies'
import { MovieCategory } from '../services';
import { createSelector } from 'reselect';

const reducers = combineReducers<State>({
   movies
})

export const makeGetMovies = (): ((state: State, category: MovieCategory) => Movie[]) => {
   return createSelector(
       [
           (state: State, category: MovieCategory) => fromMovie.getIds(state.movies, category),
           (state: State) => state.movies.byIds
       ],
       (ids: number[], byIds: { [id: string]: Movie }) => ids && byIds ? ids.map(id => byIds[id]) : []
   )
}

export const isLoading = (state: State): boolean => fromMovie.isLoading(state.movies)
export const getError = (state: State): Error | null => fromMovie.getError(state.movies)

export default reducers