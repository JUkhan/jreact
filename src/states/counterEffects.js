import { Effect } from "../store/decorators/effect";
import { ASYNC_INCREMENT, INCREMENT, DECREMENT } from "../actionTypes/actionTypes";
import { map, debounceTime } from "rxjs/operators";
import { ofType } from '../store/operators';

export class CounterEffect {
    @Effect()
    asyncInc() {
        return action$ => {

            return action$.pipe(
                ofType(ASYNC_INCREMENT),
                debounceTime(1000),
                map(() => ({ type: INCREMENT }))
            )
        }
    }



}