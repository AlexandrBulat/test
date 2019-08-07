import { combineEpics } from 'redux-observable';
import { fecthMovies } from './movies';
import { IApiService } from '../services';

export default combineEpics(
    fecthMovies
);

export interface IDependencies {
    apiService: IApiService
}