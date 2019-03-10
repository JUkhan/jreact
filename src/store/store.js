

import { BehaviorSubject } from 'rxjs';
import { map, scan, distinctUntilChanged } from 'rxjs/operators';
import { combineStates } from './combineStates';
import { STATE_METADATA_KEY } from './decorators/state';

export class Store extends BehaviorSubject {

    constructor(initialState, initStates, dispatcher) {
        super(initialState);
        this.states = {};

        for (let state of initStates) {
            this._mapState(state);
        }
        this.dispatcher = dispatcher;
        this.dispatcher.pipe(
            scan((state, action) => combineStates(state, action, this.states), initialState)
        ).subscribe(newState => super.next(newState))
    }
    dispatch(action) {
        this.dispatcher.next(action);
    }
    select(callback) {
        return this.pipe(
            map(callback),
            distinctUntilChanged()
        )
    }
    next(action) {
        this.dispatcher.next(action);
    }
    dispose() {
        this.complete();
    }
    addState(key, stateClass) {
        this._mapState(stateClass)
        this.next({ type: 'add_reducer' });
    }
    removeReducer(key) {
        delete this.states[key];

    }
    _mapState(stateClass) {
        const inst = new stateClass();
        const metaProp = inst[STATE_METADATA_KEY];
        this.states[metaProp.name] = inst;
    }


}
