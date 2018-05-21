class HashMap {
    constructor(initalCapacity = 8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initalCapacity
    }
    static _hashString(string) {
        let hash = 5381; // best prime
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash;
        }
        return hash >>> 0 //moving it to the right ? Asking a TA if possible

    }

    set(key, value) {
        const loadRatio = (this.length + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._findSlot(key);
        this._slots[index] = {
            key,
            value
        };
        this.length++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._slots[index];
            if (slot === undefined || slot.key == key) {
                return index;
            }
        }
    }
}
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap._SIZE_RATIO = 3;