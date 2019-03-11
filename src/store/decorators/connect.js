import { getStore } from '../storeContext';

const META_KEY = '__smc___'

function mount() {
    const meta = this[META_KEY];
    meta.mount.call(this);
    let that = this;
    Object.keys(meta.mapState).forEach(key => {
        meta.subscriptions.push(
            this.store.select(meta.mapState[key])
                .subscribe(res => { this.setState({ [key]: res }); }));
    });
}
function unmount() {
    const meta = this[META_KEY];
    meta.unmount.call(this);
    meta.subscriptions.forEach(sub => { sub.unsubscribe(); });
}
export function Connect(mapState = {}) {
    return function (target) {
        target = target.prototype;

        Object.defineProperty(target, 'store', {
            get() { return getStore(); },
            enumerable: true,
            configurable: true
        });

        const mapKeys = Object.keys(mapState);
        if (mapKeys.length == 0) return;

        let config = {
            mount: () => { },
            unmount: () => { },
            subscriptions: [],
            mapState
        };

        if (target.hasOwnProperty('componentWillMount')) {
            config.mount = target.componentWillMount;
        }
        Object.defineProperty(target, 'componentWillMount', {
            value: mount,
        });

        if (target.hasOwnProperty('componentWillUnmount')) {
            config.unmount = target.componentWillUnmount;
        }
        Object.defineProperty(target, 'componentWillUnmount', {
            value: unmount,
        });

        Object.defineProperty(target, META_KEY, {
            value: config,
            writable: false
        });
    }
}

