import { render, h } from "./preact/preact";
import { RootComponent } from './components/rootComponent';
import { setStoreContext } from './store/storeContext'
import { CounterEffect } from "./states/counterEffects";
import { TutorialState } from "./states/tutoroalState";
import { CounterSate } from "./states/counterState";

setStoreContext({
    states: [CounterSate, TutorialState],
    effects: [CounterEffect]
});

render(<RootComponent />, document.getElementById('create-article-form'))
