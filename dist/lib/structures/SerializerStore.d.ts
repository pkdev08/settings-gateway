import { AliasStore } from 'klasa';
import { Serializer } from './Serializer';
import { Client } from '../types';
export declare class SerializerStore extends AliasStore<string, Serializer> {
    /**
     * Constructs our SerializerStore for use in Klasa.
     * @param client The client that instantiates this store
     */
    constructor(client: Client);
}
//# sourceMappingURL=SerializerStore.d.ts.map