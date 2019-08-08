import { schema } from 'normalizr';

export const movies = new schema.Entity('movies', {}, {
    idAttribute: 'id',
    processStrategy: (entity) => ({
        id: entity.id,
        posterPath: entity.poster_path
    })
});

export const moviesSchema = [movies]

