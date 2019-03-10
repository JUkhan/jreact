
import { ignoreElements } from 'rxjs/operators';
import { merge } from 'rxjs';
//import { Reflect } from 'reflect-metadata/Reflect';

const METADATA_KEY = 'redux/effects';

export function Effect({ dispatch } = { dispatch: true }) {
    return function (target, propertyName) {
        if (!target.hasOwnProperty(METADATA_KEY)) {
            Object.defineProperty(target, METADATA_KEY, { value: [] })
        }
        target[METADATA_KEY].push({ propertyName, dispatch });
    };
}
export function getEffectsMetadata(instance) {
    return instance[METADATA_KEY];
}
export function getEffects(instance) {
    return getEffectsMetadata(instance).map(
        ({ propertyName, dispatch }) => {
            return typeof instance[propertyName] === 'function' ?
                instance[propertyName]() : instance[propertyName];

        }
    );
}
export function mergeEffects(instance, action$) {
    const observables = getEffectsMetadata(instance).map(
        ({ propertyName, dispatch }) => {
            const effect = typeof instance[propertyName] === 'function' ?
                instance[propertyName]() : instance[propertyName];

            if (dispatch === false) {
                return effect(action$).pipe(ignoreElements());
            }

            return effect(action$);
        }
    );

    return merge(...observables);
}