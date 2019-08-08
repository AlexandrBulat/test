import { combineEpics } from 'redux-observable';
import { fecthMovies, fecthMovie } from './movies';
import { IApiService } from '../services';

export default combineEpics(
    fecthMovies,
    fecthMovie
);

export interface IDependencies {
    apiService: IApiService
}