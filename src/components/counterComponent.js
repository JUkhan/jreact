import { Component, h } from "../preact/preact";
import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from "../states/actionTypes";

import { Connect } from '../store/decorators/connect';

@Connect({
    counter: state => state.counter
})
export class Counter extends Component {

    constructor(props) {
        super(props)
        this.state = { counter: {} }
    }
    increment = () => {
        this.store.dispatch({ type: INCREMENT });
    }
    decrement = () => {
        this.store.dispatch({ type: DECREMENT });
    }
    asyncIncrement = () => {
        this.store.dispatch({ type: ASYNC_INCREMENT });
    }
    render(props, { counter }) {
        console.log('counter-component');
        return <div>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
            <button onClick={this.asyncIncrement}>Asunc (+)</button> <b>count {counter.msg || counter.count}</b>
        </div>
    }
}