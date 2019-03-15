import { Component, h } from "../preact/preact";
import { REMOVE_TUTORIAL } from "../states/actionTypes";
import { Connect } from "../store/decorators/connect";

@Connect({
    tutorials: state => state.tutorials
})
export class TutorialList extends Component {
    constructor() {
        super()

    }

    onRemove(name) {
        this.store.dispatch({ type: REMOVE_TUTORIAL, payload: name });
    }
    render({ }, { tutorials }) {

        console.log('tutorial-list-component')
        return <div className="list-group">
            <a href="#" class="list-group-item list-group-item-action active">
                Tutorials
            </a>
            {tutorials.map(t => <a href="#" className="list-group-item list-group-item-action" onClick={() => this.onRemove(t.name)} key={t.name} >{t.name}</a>)}


        </div>
    }
}