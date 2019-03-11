import { Component, h } from "../preact/preact";
import { ADD_TUTORIAL } from "../states/actionTypes";
import { getStore } from '../store/storeContext';

export class AddTutorial extends Component {
    onSubmit = event => {
        event.preventDefault();
        const el = event.target.elements;
        const model = { name: el.name.value, url: el.url.value }
        getStore().dispatch({ type: ADD_TUTORIAL, payload: model });
    }
    render() {
        console.log('add-tutorial-component')
        return <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label for="name">Tutorial Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" />
            </div>
            <div className="form-group">
                <label for="url">URL</label>
                <input type="text" className="form-control" id="url" name="url" aria-describedby="emailHelp" placeholder="Enter url" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    }
}