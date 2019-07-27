import { combineEpics } from 'redux-observable';
import { fecthCryptocurrencies } from './cryptocurrencies';
import { IApiService } from '../services';

export default combineEpics(
    fecthCryptocurrencies
);

export interface IDependencies {
    apiService: IApiService
}