import { STATE_METADATA_KEY } from "./decorators/state";

function updateState(state, action, instance) {
    const metaProp = instance[STATE_METADATA_KEY];
    if (!state) { state = metaProp.initialState; }
    const actionProp = metaProp.actions[action.type];
    return actionProp ? instance[actionProp](state, action) : state;
}
export function combineStates(state, action, states) {
    return Object.keys(states).reduce((nextState, key) => {
        nextState[key] = updateState(state[key], action, states[key]);
        return nextState;
    }, {});
}
