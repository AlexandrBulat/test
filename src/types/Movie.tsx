export interface Movie {
    readonly id: number
    readonly posterPath: string
    readonly adult: false
    readonly backdrop_path: string
    readonly original_language: string
    readonly original_title: string
    readonly overview: string
    readonly popularity: number
    readonly poster_path: string
    readonly release_date: Date
    readonly title: string
    readonly video: boolean
    readonly vote_average: number
    readonly vote_count: number
}