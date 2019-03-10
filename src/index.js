import { render, h } from "./preact/preact";
//import { h } from './preact/h';
import { RootComponent } from './test';
var context = { age: 20 }

render(<RootComponent context={context} />, document.getElementById('create-article-form'))
