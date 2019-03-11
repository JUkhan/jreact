import { Component, h } from "../preact/preact";
import { REMOVE_TUTORIAL } from "../states/actionTypes";
import { getStore } from '../store/storeContext';

export class TutorialList extends Component {
    constructor() {
        super()
        this.state = { tutorials: [] }
    }
    componentWillMount() {

        this.subscription = getStore().select(state => state.tutorials)
            .subscribe(tutorials => this.setState({ tutorials }));

    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }
    onRemove(name) {
        getStore().dispatch({ type: REMOVE_TUTORIAL, payload: name });
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