import { BehaviorSubject } from 'rxjs';
import { map, scan, distinctUntilChanged, debounceTime, take } from 'rxjs/operators';
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
        ).subscribe(newState => { console.log(newState); super.next(newState); });
        //this.next({ type: 'INIT' })
        console.log('value:', this.getValue());
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
    error(error) {
        this.dispatcher.error(error)
    }
    complete() {
        this.dispatcher.complete();
    }
    dispose() {
        this.complete();
    }
    addState(stateClass) {
        const name = this._mapState(stateClass)
        this.next({ type: `add_state(${name})` });

    }
    removeState(stateName) {
        if (!this.states[stateName]) {
            console.error(`Unknown state name '${stateName}'`);
            return;
        }
        this.pipe(
            debounceTime(100),
            take(1)
        ).subscribe(() => {
            delete this.states[stateName];
            this.next({ type: `remove_state(${stateName})` });
        });

    }
    _mapState(stateClass) {
        const inst = new stateClass();
        const meta = inst[STATE_METADATA_KEY];
        this.states[meta.name] = inst;
        return meta.name;
    }
    importState(state) {
        super.next(state);
    }
}
