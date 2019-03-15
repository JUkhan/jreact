import { BehaviorSubject } from "rxjs";
import { filter } from 'rxjs/operators';

export class Dispatcher extends BehaviorSubject {
    constructor() {
        super({ type: '@@INIT' })
    }

    dispatch(action) {
        this.next(action)
    }

    ofType(actionType) {
        return this.pipe(
            filter(action => action.type === actionType)
        );
    }
    complete() {

    }

    dispose() {
        super.complete();
    }
}