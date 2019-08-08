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