"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@klasa/utils");
class SchemaEntry {
    constructor(parent, key, type, options = {}) {
        /**
         * The KlasaClient for this SchemaEntry.
         */
        this.client = null;
        this.client = null;
        this.parent = parent;
        this.key = key;
        this.path = this.parent.path.length === 0 ? this.key : `${this.parent.path}.${this.key}`;
        this.type = type.toLowerCase();
        this.array = typeof options.array === 'undefined' ? typeof options.default === 'undefined' ? false : Array.isArray(options.default) : options.array;
        this.default = typeof options.default === 'undefined' ? this._generateDefaultValue() : options.default;
        this.minimum = typeof options.minimum === 'undefined' ? null : options.minimum;
        this.maximum = typeof options.maximum === 'undefined' ? null : options.maximum;
        this.inclusive = typeof options.inclusive === 'undefined' ? false : options.inclusive;
        this.configurable = typeof options.configurable === 'undefined' ? this.type !== 'any' : options.configurable;
        this.filter = typeof options.filter === 'undefined' ? null : options.filter;
        this.shouldResolve = typeof options.resolve === 'undefined' ? true : options.resolve;
    }
    /**
     * Get the serializer that manages this instance.
     */
    get serializer() {
        if (this.client === null)
            throw new Error('Cannot retrieve serializers from non-initialized SchemaEntry.');
        return this.client.serializers.get(this.type) || null;
    }
    /**
     * Edits this SchemaEntry instance.
     * @param options The options to edit
     */
    edit(options = {}) {
        if (typeof options.type === 'string')
            this.type = options.type.toLowerCase();
        if (typeof options.array !== 'undefined')
            this.array = options.array;
        if (typeof options.configurable !== 'undefined')
            this.configurable = options.configurable;
        if (typeof options.default !== 'undefined')
            this.default = options.default;
        if (typeof options.filter !== 'undefined')
            this.filter = options.filter;
        if (typeof options.inclusive !== 'undefined')
            this.inclusive = options.inclusive;
        if (typeof options.resolve !== 'undefined')
            this.shouldResolve = options.resolve;
        if (('minimum' in options) || ('maximum' in options)) {
            const { minimum = null, maximum = null } = options;
            this.minimum = minimum;
            this.maximum = maximum;
        }
        return this;
    }
    /**
     * Overload to serialize this entry to JSON.
     */
    toJSON() {
        return {
            type: this.type,
            array: this.array,
            configurable: this.configurable,
            default: this.default,
            inclusive: this.inclusive,
            maximum: this.maximum,
            minimum: this.minimum,
            resolve: this.shouldResolve
        };
    }
    /**
     * Performs the validity checks of this entry
     * @internal
     */
    _check() {
        if (this.client === null)
            throw new Error('Cannot retrieve serializers from non-initialized SchemaEntry.');
        // Check type
        if (typeof this.type !== 'string')
            throw new TypeError(`[KEY] ${this.path} - Parameter 'type' must be a string.`);
        if (!this.client.serializers.has(this.type))
            throw new TypeError(`[KEY] ${this.path} - '${this.type}' is not a valid type.`);
        // Check array
        if (typeof this.array !== 'boolean')
            throw new TypeError(`[KEY] ${this.path} - Parameter 'array' must be a boolean.`);
        // Check configurable
        if (typeof this.configurable !== 'boolean')
            throw new TypeError(`[KEY] ${this.path} - Parameter 'configurable' must be a boolean.`);
        // Check limits
        if (this.minimum !== null && !utils_1.isNumber(this.minimum))
            throw new TypeError(`[KEY] ${this.path} - Parameter 'minimum' must be a number or null.`);
        if (this.maximum !== null && !utils_1.isNumber(this.maximum))
            throw new TypeError(`[KEY] ${this.path} - Parameter 'maximum' must be a number or null.`);
        if (this.minimum !== null && this.maximum !== null && this.minimum > this.maximum) {
            throw new TypeError(`[KEY] ${this.path} - Parameter 'minimum' must contain a value lower than the parameter 'maximum'.`);
        }
        // Check filter
        if (this.filter !== null && !utils_1.isFunction(this.filter))
            throw new TypeError(`[KEY] ${this.path} - Parameter 'filter' must be a function`);
        // Check default
        if (this.array) {
            if (!Array.isArray(this.default))
                throw new TypeError(`[DEFAULT] ${this.path} - Default key must be an array if the key stores an array.`);
        }
        else if (this.default !== null) {
            if (['boolean', 'string'].includes(this.type) && typeof this.default !== this.type)
                throw new TypeError(`[DEFAULT] ${this.path} - Default key must be a ${this.type}.`);
        }
    }
    /**
     * The default value generator, called when type and array are given but not the default itself.
     */
    _generateDefaultValue() {
        if (this.array)
            return [];
        if (this.type === 'boolean')
            return false;
        return null;
    }
}
exports.SchemaEntry = SchemaEntry;
//# sourceMappingURL=SchemaEntry.js.map