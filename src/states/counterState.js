import { State, Action } from "../store/decorators/state";
import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from "./actionTypes";
import { updateObject } from "../utli";

@State({
    name: 'count',
    initialState: { count: 10, msg: '' }
})
export class CounterSate {

    @Action(INCREMENT)
    increment(state, action) {
        return updateObject(state, { count: state.count + 1, msg: '' })
    }

    @Action(DECREMENT)
    decrement(state, action) {
        return updateObject(state, { count: state.count - 1, msg: '' })
    }

    @Action(ASYNC_INCREMENT)
    asyncIncrement(state, action) {
        return updateObject(state, { msg: 'loading...' })
    }
}