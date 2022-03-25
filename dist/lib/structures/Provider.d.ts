import { Piece } from 'klasa';
import { SchemaFolder } from '../schema/SchemaFolder';
import { SchemaEntry } from '../schema/SchemaEntry';
import { SettingsUpdateResults } from '../settings/SettingsFolder';
import { KeyedObject } from '../types';
export declare abstract class Provider extends Piece {
    /**
     * Inserts or creates a table in the database.
     * @param table The table to check against
     * @param rows The rows to insert
     */
    abstract createTable(table: string, rows?: readonly [string, string][]): Promise<unknown>;
    /**
     * Deletes or drops a table from the database.
     * @param table The table to check against
     */
    abstract deleteTable(table: string): Promise<unknown>;
    /**
     * Checks if a table exists in the database.
     * @param table The table to check against
     */
    abstract hasTable(table: string): Promise<boolean>;
    /**
     * Inserts new entry into a table.
     * @param table The table to update
     * @param entry The entry's ID to create
     * @param data The data to insert
     */
    abstract create(table: string, entry: string, data: object | SettingsUpdateResults): Promise<unknown>;
    /**
     * Removes entries from a table.
     * @param table The table to update
     * @param entry The ID of the entry to delete
     */
    abstract delete(table: string, entry: string): Promise<unknown>;
    /**
     * Retrieve a single entry from a table.
     * @param table The table to query
     * @param entry The ID of the entry to retrieve
     */
    abstract get(table: string, entry: string): Promise<object | null>;
    /**
     * Retrieve all entries from a table.
     * @param table The table to query
     * @param entries The ids to retrieve from the table
     */
    abstract getAll(table: string, entries?: readonly string[]): Promise<object[]>;
    /**
     * Retrieves all entries' keys from a table.
     * @param table The table to query
     */
    abstract getKeys(table: string): Promise<string[]>;
    /**
     * Check if an entry exists in a table.
     * @param table The table to update
     * @param entry The entry's ID to check against
     */
    abstract has(table: string, entry: string): Promise<boolean>;
    /**
     * Updates an entry from a table.
     * @param table The table to update
     * @param entry The entry's ID to update
     * @param data The data to update
     */
    abstract update(table: string, entry: string, data: object | SettingsUpdateResults): Promise<unknown>;
    /**
     * Overwrites the data from an entry in a table.
     * @param table The table to update
     * @param entry The entry's ID to update
     * @param data The new data for the entry
     */
    abstract replace(table: string, entry: string, data: object | SettingsUpdateResults): Promise<unknown>;
    /**
     * Shutdown method, this is called before the piece is unloaded.
     */
    shutdown(): unknown;
    /**
     * The addColumn method which inserts/creates a new table to the database.
     * @param table The table to check against
     * @param entry The SchemaFolder or SchemaEntry added to the schema
     */
    addColumn(_table: string, _entry: SchemaFolder | SchemaEntry): Promise<unknown>;
    /**
     * The removeColumn method which inserts/creates a new table to the database.
     * @since 0.5.0
     * @param table The table to check against
     * @param columns The column names to remove
     */
    removeColumn(_table: string, _columns: readonly string[]): Promise<unknown>;
    /**
     * The updateColumn method which alters the datatype from a column.
     * @param table The table to check against
     * @param entry The modified SchemaEntry
     */
    updateColumn(_table: string, _entry: SchemaEntry): Promise<unknown>;
    /**
     * The getColumns method which gets the name of all columns.
     * @param table The table to check against
     */
    getColumns(_table: string): Promise<string[]>;
    /**
     * Process the input from {@link Settings#update} or {@link Settings#reset} into a plain object that can be used for
     * document-based database drivers. If it receives a non-array, it returns the value without further processing.
     * @param changes The data that has been updated
     */
    protected parseUpdateInput(changes: object | SettingsUpdateResults): KeyedObject;
}
//# sourceMappingURL=Provider.d.ts.map