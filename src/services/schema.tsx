import { schema } from 'normalizr';

export const movies = new schema.Entity('movies', {}, {
    idAttribute: 'id'
});

export const moviesSchema = [movies]

