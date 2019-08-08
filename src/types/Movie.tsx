export interface Movie {
    readonly id: number
    readonly posterPath: string
    readonly title?: string
    readonly overview?: string
    readonly releaseDate?: string
    readonly voteAverage?: number
    readonly runtime?: number
    readonly genres: string[]
}

export enum Fields {
    Title = "title",
    Overview = "overview",
    ReleaseDate = "releaseDate",
    VoteAverage = "voteAverage",
    Runtime = "runtime",
    Genres = "genres"
}