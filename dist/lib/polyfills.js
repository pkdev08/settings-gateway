"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next: Polyfill, only used in Node.js versions older than 12.4.0 */
function ObjectFromEntries(entries) {
    const obj = {};
    for (const pair of entries) {
        if (Object(pair) !== pair) {
            throw new TypeError('iterable for fromEntries should yield objects');
        }
        const { 0: key, 1: val } = pair;
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: val
        });
    }
    return obj;
}
/* istanbul ignore next: Polyfill, first branch is used in Node.js 12.4.0 and newer, the other by older versions */
exports.fromEntries = typeof Object.fromEntries === 'function' ? Object.fromEntries : ObjectFromEntries;
//# sourceMappingURL=polyfills.js.map