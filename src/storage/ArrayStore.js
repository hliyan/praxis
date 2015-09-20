import EventEmitter from 'events';

export default class ArrayStore extends EventEmitter {
    constructor() {
        super();
        this.data = [];
    }

    get(key) {
        if (typeof key === 'undefined') {
            return this.data;
        } else {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].key == key)
                    return this.data[i];
            }
            return null;
        }
    }

    onAction(action) {
        if (action.action in this) {
            var handleAction = this[action.action].bind(this);
            handleAction(action);
        }
    }

    _generateKey() {
        if ('nextKey' in this == false)
            this.nextKey = 1;
        return this.nextKey++;
    }

    _insert(record) {
        if ('key' in record == false)
            record.key = this._generateKey();
        this.data.push(record);
    }
}