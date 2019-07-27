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
    fetchCryptocurrenciesFulfilled,
    fetchCryptocurrenciesFailed
} from '../actions';
import { NormalizedObject } from '../reducers/types';
import { Cryptocurrency } from '../types';
import { IDependencies } from '.';

export const fecthCryptocurrencies: Epic = (action$, _, { apiService }: IDependencies) => {
    const stopPolling$ = action$.pipe(
        ofType(TypeKeys.CRYPTOCURRENCIES_FETCH_STOP)
    )
    return action$.pipe(
        ofType(TypeKeys.CRYPTOCURRENCIES_FETCH),
        switchMap(() => {
            return timer(0, 60 * 1000).pipe(
                takeUntil(stopPolling$),
                switchMap(() => {
                    return apiService.getCryptocurrencies().pipe(
                        map((cryptocurrencies: NormalizedObject<Cryptocurrency>) => fetchCryptocurrenciesFulfilled(cryptocurrencies)),
                        catchError((error: Error) => of(fetchCryptocurrenciesFailed(error)))
                    )
                })
            )
        })
    )
}



