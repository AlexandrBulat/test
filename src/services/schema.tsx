import { schema } from 'normalizr';

export const movies = new schema.Entity('movies', {}, {
    idAttribute: 'id',
    processStrategy: (entity) => ({
      id: entity.id,
      posterPath: entity.posterPath
    })
});

export const moviesSchema = [movies]

