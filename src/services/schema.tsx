import { schema } from 'normalizr';

export const movies = new schema.Entity('movies', {}, {
    idAttribute: 'id',
    processStrategy: (entity) => ({
        id: entity.id,
        posterPath: entity.poster_path,
        title: entity.title,
        overview: entity.overview,
        releaseDate: entity.releaseDate,
        voteAverage: entity.voteAverage,
        runtime: entity.runtime,
        genres: entity.genres,
    })
});

export const moviesSchema = [movies]

