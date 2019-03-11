import { State, Action } from '../store/decorators/state'
import { ADD_TUTORIAL, REMOVE_TUTORIAL } from './actionTypes';

@State({
    name: 'tutorials',
    initialState: [{ name: 'Dagger js -> djs' }]
})
export class TutorialState {

    @Action(ADD_TUTORIAL)
    addTutorial(state, { payload }) {

        return [...state, payload]
    }

    @Action(REMOVE_TUTORIAL)
    removeTutorial(state, { payload }) {
        return state.filter(tutorial => tutorial.name != payload)
    }
}