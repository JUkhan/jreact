import { Component, h } from "../preact/preact";
import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from "../states/actionTypes";

export class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = { count: 1 }
    }
    com
    subscription;
    componentWillMount() {

        this.subscription = this.context.store.select(state => state.count).subscribe(res => this.setState(res));
        /*this.context.store.addEffect(action$ => action$.ofType(ASYNC_INCREMENT)
            .pipe(
                //ofType(ASYNC_INCREMENT),
                debounceTime(1000),
                mapTo({ type: INCREMENT })
            )
        )*/
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    increment = () => {
        this.context.store.dispatch({ type: INCREMENT });
    }
    decrement = () => {
        this.context.store.dispatch({ type: DECREMENT });
    }
    asyncIncrement = () => {
        this.context.store.dispatch({ type: ASYNC_INCREMENT });
    }
    render(props, { count, msg }) {
        console.log('counter-component');
        return <div>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
            <button onClick={this.asyncIncrement}>Asunc (+)</button> <b>count {msg || count}</b>
        </div>
    }
}