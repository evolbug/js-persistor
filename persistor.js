class Persistor {
    constructor(key) {
        Object.defineProperty(this, "key", {
            value: key,
            enumerable: false,
        });

        Object.defineProperty(this, "old", {
            value: JSON.parse(localStorage[key] || "{}"),
            enumerable: false,
        });

        delete localStorage[key];

        return new Proxy(this, {
            get: (target, key) => target[key] || target.old[key],
            set: (target, key, value) => {
                target[key] = value;
                localStorage[target.key] = JSON.stringify(target);
                return true;
            },
        });
    }

    remember() {
        for (let key in this.old) {
            this[key] = this.old[key];
        }
    }

    forget() {
        this.old = {};
    }
}
