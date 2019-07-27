import { Observable, of } from "rxjs";
import { from } from 'rxjs'
import { AxiosInstance } from 'axios';
import { NormalizedObject } from "../reducers/types";
import { Cryptocurrency } from "../types";
import { map, switchMap } from "rxjs/operators";
import { normalize } from 'normalizr'
import { cryptocurrenciesSchema } from "./schema";
import { Constants } from "../constants/Constants";
import ApiError from "../errors/ApiError";

export interface IApiService {
    getCryptocurrencies(): Observable<NormalizedObject<Cryptocurrency>>;
}

type Status = {
    errorCode: number,
    errorMessage?: string
}

export class ApiService implements IApiService {
    protected axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public getCryptocurrencies(): Observable<NormalizedObject<Cryptocurrency>> {
        return from(this.axios.get(`cryptocurrency/listings/latest?limit=${Constants.CMC_FETCH_SIZE}`)).pipe(
            switchMap((result) => {
                const status: Status = result.data.status
                return status.errorCode ?
                    Observable.throw(new ApiError(status.errorCode, status.errorMessage)) :
                    of(result)
            }),
            map((result) => {
                const normalizedCryptocurrencies = normalize(result.data.data, cryptocurrenciesSchema)
                return {
                    byIds: normalizedCryptocurrencies.entities.cryptocurrencies || {},
                    ids: normalizedCryptocurrencies.result || []
                }
            })
        )
    }
}
