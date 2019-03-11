import { render, h } from "./preact/preact";
import { RootComponent } from './components/rootComponent';
import { getStoreContext } from './store/storeContext'
import { CounterEffect } from "./states/counterEffects";
import { TutorialState } from "./states/tutoroalState";
import { CounterSate } from "./states/counterState";

var store = getStoreContext({
    states: [CounterSate, TutorialState],
    effects: [CounterEffect]
});

render(<RootComponent store={store} />, document.getElementById('create-article-form'))
