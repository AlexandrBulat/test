import { Movie } from "../../types";

export interface State {
   movies: MoviesState,
   movie: MovieState
}

export interface MoviesState {
   loading: boolean
   error: Error | null
   byIds: {
      [key: number]: Movie
   }
   ids: { [id: string]: number[] }
}

export interface MovieState {
   loading: boolean
   error: Error | null
   movie: Movie | null
}