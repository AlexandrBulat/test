import { Movie } from "../../types";

export interface State {
   movies: MoviesState
}

export interface MoviesState {
   loading: boolean
   error: Error | null
   byIds: {
      [key: number]: Movie
   }
   ids: { [id: string]: number[] }
}