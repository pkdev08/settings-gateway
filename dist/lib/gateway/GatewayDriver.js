"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polyfills_1 = require("../polyfills");
const collection_1 = require("@discordjs/collection");
class GatewayDriver extends collection_1.default {
    /**
     * Constructs a new instance of GatewayDriver.
     * @param client The client that manages this instance
     */
    constructor(client) {
        super();
        this.client = client;
    }
    /**
     * Registers a new gateway.
     * @param gateway The gateway to register
     * @example
     * // Import Client and Gateway from klasa
     * const { Client, Gateway } = require('klasa');
     *
     * // Construct the client and register a gateway named channels
     * const client = new Client();
     * client.register(new Gateway(client, 'channels'));
     *
     * @example
     * // Import Client and Gateway from klasa
     * const { Client, Gateway } = require('klasa');
     * const client = new Client();
     *
     * // register calls can be chained
     * client
     *     .register(new Gateway(client, 'channels'))
     *     .register(new GatewayStorage(client, 'moderations', { provider: 'postgres' }));
     */
    register(gateway) {
        this.set(gateway.name, gateway);
        return this;
    }
    /**
     * Initializes all gateways.
     */
    async init() {
        await Promise.all([...this.values()].map(gateway => gateway.init()));
    }
    /**
     * The gateway driver with all serialized gateways.
     */
    toJSON() {
        return polyfills_1.fromEntries([...this.entries()].map(([key, value]) => [key, value.toJSON()]));
    }
}
exports.GatewayDriver = GatewayDriver;
//# sourceMappingURL=GatewayDriver.js.map