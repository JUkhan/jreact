
import { Store } from './store';
import { Dispatcher } from './dispatcher';
import { EffectSubscription } from './effectSubscription';
import { Actions } from './actions';



class StoreContext {
    constructor(initialState, states) {

        this.dispatcher = new Dispatcher();
        this.actions = new Actions(this.dispatcher);
        this.store = new Store(initialState, states, this.dispatcher);
        this.effSubs = new EffectSubscription(this.store);
    }
    dispatch(action) {
        this.dispatcher.dispatch(action);
    }
    addReducer(key, reducer) {
        this.store.addReducer(key, reducer);
    }
    select(callback) {
        return this.store.select(callback);
    }
    addEffect(callback, dispatch = true) {
        this.effSubs.addEffect(callback(this.actions));
    }
    addEffects(...effectClassType) {
        this.effSubs.addEffects(effectClassType.map(_ => new _()), this.actions);
    }
    dispose() {
        this.dispatcher.dispose();
        this.store.dispose();
        this.effSubs.dispose();
        console.log('store-disposed-successfully');
    }
}

export function getStoreContext({ initialState = {}, states = [], effects = [] }) {
    const ctx = new StoreContext(initialState, states);
    ctx.addEffects(...effects);
    return ctx;
}