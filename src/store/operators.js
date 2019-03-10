import { filter } from 'rxjs/operators';

export const ofType = (...types) => (source) => source.pipe(
    filter(({ type }) => {
        return types.some(_type => _type === type);
    })
);