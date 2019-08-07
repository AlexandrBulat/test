import { NormalizedObject } from "./NormalizedObject";
import { Movie } from "../../types";

export interface State {
   movies: MoviesState
}

export interface MoviesState extends NormalizedObject<Movie> {
   loading: boolean
   error: Error | null
}