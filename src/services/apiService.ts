import { Observable, of } from "rxjs";
import { from } from 'rxjs'
import { AxiosInstance } from 'axios';
import { NormalizedObject } from "../reducers/types";
import { Movie } from "../types";
import { map, switchMap } from "rxjs/operators";
import { normalize } from 'normalizr'
import { moviesSchema } from "./schema";
import { Constants } from "../constants/Constants";
import ApiError from "../errors/ApiError";

export interface IApiService {
    getMovies(): Observable<NormalizedObject<Movie>>;
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

    public getMovies(): Observable<NormalizedObject<Movie>> {
        return from(this.axios.get(`cryptocurrency/listings/latest?limit=${Constants.CMC_FETCH_SIZE}`)).pipe(
            switchMap((result) => {
                const status: Status = result.data.status
                return status.errorCode ?
                    Observable.throw(new ApiError(status.errorCode, status.errorMessage)) :
                    of(result)
            }),
            map((result) => {
                const normalizedMovies = normalize(result.data.data, moviesSchema)
                return {
                    byIds: normalizedMovies.entities.movies || {},
                    ids: normalizedMovies.result || []
                }
            })
        )
    }
}
