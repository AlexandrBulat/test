import { Observable, of } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { NormalizedObject } from "../reducers/types";
import { Movie } from "../types";
import { map, switchMap } from "rxjs/operators";
import { normalize } from 'normalizr'
import { moviesSchema } from "./schema";
import { Constants } from "../constants/Constants";
import ApiError from "../errors/ApiError";

type Status = {
    status_code?: number,
    status_message?: string
}
export enum MovieCategory {
    Top = 'top_rated',
    Popular = 'popular',
    Upcoming = 'upcoming'
}

export interface IApiService {
    getMovies(category: MovieCategory): Observable<NormalizedObject<Movie>>;

    getMovie(movieId: number): Observable<Movie>;
}

export class ApiService implements IApiService {
    getMovie(movieId: number): Observable<Movie> {
        return ajax.get(`${Constants.BASE_URL}/movie/${movieId}?${Constants.API_KEY_FIELD}=${Constants.API_KEY}`)
            .pipe(
                switchMap((result) => {
                    const response: Status & any = result.response as Status
                    return response.status_code ?
                        Observable.throw(new ApiError(response.status_code, response.status_message)) :
                        of(({
                            id: response.id,
                            posterPath: response.poster_path,
                            title: response.title,
                            overview: response.overview,
                            releaseDate: response.release_date,
                            voteAverage: response.vote_average,
                            runtime: response.runtime,
                            genres: response.genres,
                        }))
                }),
            )
    }

    public getMovies(category: MovieCategory): Observable<NormalizedObject<Movie>> {
        return ajax.get(`${Constants.BASE_URL}/movie/${category}?${Constants.API_KEY_FIELD}=${Constants.API_KEY}`)
            .pipe(
                switchMap((result) => {
                    const status: Status = result.response as Status
                    return status.status_code ?
                        Observable.throw(new ApiError(status.status_code, status.status_message)) :
                        of(result.response)
                }),
                map((response) => {
                    const normalizedMovies = normalize(response.results, moviesSchema)
                    return {
                        byIds: normalizedMovies.entities.movies || {},
                        ids: normalizedMovies.result || []
                    }
                })
            )
    }
}
