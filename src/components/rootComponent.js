import { Component, h } from "../preact/preact";
import { Counter } from "./counterComponent";
import { AddTutorial } from "./addTutorialComponent";
import { TutorialList } from "./tutotialListComponent";
import { getStore } from '../store/storeContext';
import { Connect } from '../store/decorators/connect';

@Connect({
    tutorials: state => state.tutorials
})
export class RootComponent extends Component {
    constructor() {
        super();
        this.state = { tutorials: [] }
    }

    componentWillUnmount() {
        this.store.dispose();
    }
    tutorialsHasNamedCounter() {
        return !!this.state.tutorials.find(_ => _.name == 'counter');
    }
    render(props) {
        console.log('root-component');
        return <div>
            {this.tutorialsHasNamedCounter() ?
                <div className="text-danger">Please remove counter tutorial.</div> : <Counter></Counter>}
            <div className="row">
                <div className="col-6">
                    <AddTutorial></AddTutorial>
                </div>
                <div className="col-6">
                    <TutorialList></TutorialList>
                </div>
            </div>
        </div>

    }
}