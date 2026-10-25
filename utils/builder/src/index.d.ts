type _PathLike = string | URL;

/**
 * Loads all the structures in the provided directory.
 *
 * @param dir - The directory to load the structures from
 * @param recursive - Whether to recursively load the structures in the directory
 */
export declare function loadLanguages<T>(dir: _PathLike, recursive?: boolean): Promise<T[]>;
export declare function build(): Promise<void>;
export interface UserJS {
  name: string;
  description: string;
  version: string;
  license?: string;
  bugs?: URL;
  homepage?: URL;
  icon?: _PathLike;
  downloadURL?: URL;
  updateURL?: URL;
  url_source?: URL;
  url?: URL;
  build: {
    source: {
      languageList: string;
      [source: string]: _PathLike;
    };
    watch: {
      files: string[];
      directories: string[];
      /** @deprecated */
      dirs?: string[];
    };
    paths: {
      fileName: string;
      dir: _PathLike;
      i18n: {
        default: string;
        dir: _PathLike;
      };
      dev?: {
        fileName?: string;
        dir?: _PathLike;
      };
    };
  };
  metadata: {
    compatible: string[];
    connect: string[];
    grant: string[];
    exclude: string[];
    include: string[];
    'exclude-match': string[];
    match: string[];
    noframes: boolean;
    resource: {
      [name: string]: string;
    };
    require: string[];
    'run-at': 'document-start' | 'document-body' | 'document-end' | 'document-idle';
  };
}

declare global {
  interface Map<K, V> {
    /**
     * Returns the value associated with `key`. If `key` is not present,
     * stores `value` under `key` and returns it.
     *
     * - `value` is evaluated eagerly at the call site, even when `key`
     *   already exists. Use `getOrInsertComputed()` for expensive defaults.
     * - A key of `-0` is normalized to `+0` before lookup and insertion.
     *
     * @example
     * const counts = new Map<string, number>();
     * counts.set("a", counts.getOrInsert("a", 0) + 1);
     *
     * @param key The key to look up.
     * @param value The value to insert when `key` is missing.
     * @returns The existing or newly inserted value.
     */
    getOrInsert(key: K, value: V): V;

    /**
     * Returns the value associated with `key`. If `key` is not present,
     * calls `callbackfn(key)`, stores the result under `key`, and returns it.
     *
     * - The callback runs only when the key is absent (lazy initialization).
     * - A key of `-0` is normalized to `+0` before lookup, insertion,
     *   and being passed to the callback.
     * - If the callback itself inserts `key`, the callback's return value
     *   still overwrites that entry.
     *
     * @example
     * const groups = new Map<string, string[]>();
     * groups.getOrInsertComputed("fruits", () => []).push("apple");
     *
     * @param key The key to look up.
     * @param callbackfn Computes the value to insert when `key` is missing.
     * @returns The existing or newly inserted value.
     */
    getOrInsertComputed(key: K, callbackfn: (key: K) => V): V;
  }

  interface WeakMap<K extends WeakKey, V> {
    /**
     * Returns the value associated with `key`. If `key` is not present,
     * stores `value` under `key` and returns it.
     *
     * Throws a `TypeError` if `key` cannot be held weakly (i.e. it is not
     * an object or a non-registered symbol).
     *
     * @example
     * const visits = new WeakMap<object, number>();
     * visits.set(node, visits.getOrInsert(node, 0) + 1);
     *
     * @param key The key to look up; must be a valid weak key.
     * @param value The value to insert when `key` is missing.
     * @returns The existing or newly inserted value.
     */
    getOrInsert(key: K, value: V): V;

    /**
     * Returns the value associated with `key`. If `key` is not present,
     * calls `callbackfn(key)`, stores the result under `key`, and returns it.
     *
     * Throws a `TypeError` *before* invoking the callback if `key` cannot be
     * held weakly (i.e. it is not an object or a non-registered symbol).
     *
     * @example
     * const cache = new WeakMap<object, Metadata>();
     * const meta = cache.getOrInsertComputed(node, (n) => computeMetadata(n));
     *
     * @param key The key to look up; must be a valid weak key.
     * @param callbackfn Computes the value to insert when `key` is missing.
     * @returns The existing or newly inserted value.
     */
    getOrInsertComputed(key: K, callbackfn: (key: K) => V): V;
  }
}
