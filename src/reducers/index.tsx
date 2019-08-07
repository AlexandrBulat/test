import { combineReducers } from 'redux'
import { Movie } from '../types';
import { State } from './types';
import movies, * as fromMovie from './movies'

const reducers = combineReducers<State>({
   movies
})

export const getMovies = (state: State): Movie[] =>
   fromMovie.getMovies(state.movies)
export const isLoading = (state: State): boolean => fromMovie.isLoading(state.movies)
export const getError = (state: State): Error | null => fromMovie.getError(state.movies)

export default reducers