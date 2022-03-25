import { Schema } from './Schema';
import { SchemaFolder } from './SchemaFolder';
import { Client } from '../types';
import { Serializer, SerializerUpdateContext } from '../structures/Serializer';
export declare class SchemaEntry {
    /**
     * The KlasaClient for this SchemaEntry.
     */
    client: Client | null;
    /**
     * The schema that manages this instance.
     */
    readonly parent: Schema | SchemaFolder;
    /**
     * The key of this entry relative to its parent.
     */
    readonly key: string;
    /**
     * The absolute key of this entry.
     */
    readonly path: string;
    /**
     * The type of data this entry manages.
     */
    type: string;
    /**
     * Whether or not this entry should hold an array of data.
     */
    array: boolean;
    /**
     * The default value this entry will set when reverting a setting back to or when the key was not set.
     */
    default: unknown;
    /**
     * The minimum value for this entry.
     */
    minimum: number | null;
    /**
     * The maximum value for this entry.
     */
    maximum: number | null;
    /**
     * Whether this entry should inclusively or exclusively check minimum and maximum on key validation.
     */
    inclusive: boolean;
    /**
     * Whether or not this entry should be configurable by the configuration command.
     */
    configurable: boolean;
    /**
     * The filter to use for this entry when resolving.
     */
    filter: SchemaEntryFilterFunction | null;
    /**
     * Whether or not values managed by this entry should be resolved.
     */
    shouldResolve: boolean;
    constructor(parent: Schema | SchemaFolder, key: string, type: string, options?: SchemaEntryOptions);
    /**
     * Get the serializer that manages this instance.
     */
    get serializer(): Serializer | null;
    /**
     * Edits this SchemaEntry instance.
     * @param options The options to edit
     */
    edit(options?: SchemaEntryEditOptions): this;
    /**
     * Overload to serialize this entry to JSON.
     */
    toJSON(): SchemaEntryJson;
    /**
     * Performs the validity checks of this entry
     * @internal
     */
    _check(): void;
    /**
     * The default value generator, called when type and array are given but not the default itself.
     */
    private _generateDefaultValue;
}
export interface SchemaEntryOptions {
    array?: boolean;
    configurable?: boolean;
    default?: unknown;
    filter?: SchemaEntryFilterFunction | null;
    inclusive?: boolean;
    maximum?: number | null;
    minimum?: number | null;
    resolve?: boolean;
}
export interface SchemaEntryEditOptions extends SchemaEntryOptions {
    type?: string;
}
export declare type SchemaEntryJson = Required<Omit<SchemaEntryEditOptions, 'filter'>>;
export interface SchemaEntryFilterFunction {
    (client: Client, value: unknown, context: SerializerUpdateContext): boolean;
}
//# sourceMappingURL=SchemaEntry.d.ts.map