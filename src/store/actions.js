import { Observable } from "rxjs";
import { ofType } from "./operators";

export class Actions extends Observable {
    constructor(dispatcher) {
        super()
        if (dispatcher)
            this.source = dispatcher;
    }
    lift(operator) {
        const observable = new Actions(this);
        observable.operator = operator;
        return observable;
    }

    ofType(...actionTypes) {
        /*return this.pipe(
            filter(action => action.type === actionType)
        );*/
        /*return filter((action) =>
            allowedTypes.some(type => type === action.type)
        );*/
        return ofType(...actionTypes)(this);

    }
    /*whenAction(...keys) {
        return filter.call(this, ({ type }) => {
            const len = keys.length;
            if (len === 1) {
                return type === keys[0];
            } else {
                for (let i = 0; i < len; i++) {
                    if (keys[i] === type) {
                        return true;
                    }
                }
            }
            return false;
        });
    }*/

}