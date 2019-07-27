import { schema } from 'normalizr';

export const cryptocurrencies = new schema.Entity('cryptocurrencies', {}, {
    idAttribute: 'id'
});

export const cryptocurrenciesSchema = [cryptocurrencies]

