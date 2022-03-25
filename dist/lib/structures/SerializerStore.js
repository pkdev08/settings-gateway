"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const Serializer_1 = require("./Serializer");
class SerializerStore extends klasa_1.AliasStore {
    /**
     * Constructs our SerializerStore for use in Klasa.
     * @param client The client that instantiates this store
     */
    constructor(client) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore 2345
        super(client, 'serializers', Serializer_1.Serializer);
    }
}
exports.SerializerStore = SerializerStore;
//# sourceMappingURL=SerializerStore.js.map