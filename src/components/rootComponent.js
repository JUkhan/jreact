import { Component, h } from "../preact/preact";
import { Counter } from "./counterComponent";
import { AddTutorial } from "./addTutorialComponent";
import { TutorialList } from "./tutotialListComponent";

export class RootComponent extends Component {
    constructor() {
        super();

    }
    componentWillMount() {

        this.context.store = this.props.store;
    }
    componentWillUnmount() {
        this.context.store.dispose();
    }
    render(props) {
        console.log('root-component');
        return <div>
            <Counter></Counter>
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