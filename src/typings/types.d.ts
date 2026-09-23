//#region Utilites

/**
 * Transform target into Array
 *
 * - `entries`, `keys` and `values` pick what is returned for objects, `Set` and `Map`
 * - `keys` splits a string, with `root` as the separator when it is a string
 * - a string with a `root` element returns the matching elements
 */
export declare function toArray<T, A extends Record<string, boolean> = Record<string, never>>(
  target?: T | null,
  args?: A,
  root?: Document | Element | HTMLElement | string | null | undefined
): T extends null | undefined
  ? []
  : T extends readonly unknown[]
    ? T
    : T extends Document | Element | HTMLElement
      ? [T]
      : T extends string
        ? A extends {
            keys: true;
          }
          ? string[]
          : Document | Element | HTMLElement | string | null | undefined extends
                | Document
                | Element
                | HTMLElement
            ? Element[]
            : [T]
        : A extends {
              entries: true;
            }
          ? T extends Record<infer K, infer V>
            ? Array<[K extends string ? K : string, V]>
            : Array<[string, unknown]>
          : A extends {
                keys: true;
              }
            ? T extends Record<infer K, unknown>
              ? Array<K extends string ? K : string>
              : T extends Set<unknown> | Map<infer K, unknown>
                ? K[]
                : string[]
            : A extends {
                  values: true;
                }
              ? T extends Record<string, infer V>
                ? V[]
                : T extends Set<infer V> | Map<unknown, infer V>
                  ? V[]
                  : unknown[]
              : T extends Iterable<infer U>
                ? U[]
                : unknown[];

/**
 * Object to `[object *]`
 */
export declare function objToStr<O>(obj: O): string;
/**
 * Object is typeof `RegExp`
 */
export declare function isRegExp(obj: unknown): obj is RegExp;
/**
 * Object is typeof `HTMLElement`
 */
export declare function isHTML(obj: unknown): obj is HTMLElement;
/**
 * Object is typeof `Element`
 */
export declare function isElem(obj: unknown): obj is Element;
/**
 * Object is typeof `object` / JSON Object
 */
export declare function isObj(obj: unknown): obj is object;
/**
 * Object is typeof `Function`
 */
export declare function isFN(obj: unknown): obj is () => void;
/**
 * Object is `null` or `undefined`
 */
export declare function isNull(obj: unknown): obj is null | undefined;
/**
 * Object is blank
 */
export declare function isBlank<O>(obj: O): boolean;
/**
 * Object is empty
 */
export declare function isEmpty<O>(obj: O): boolean;
//#endregion

//#region Config
export interface Theme {
  'mph-site-color': string;
  'mph-hover-color': string;
  'mph-background-color': string;
  'mph-border-color': string;
  'mph-text-color': string;
  'mph-root-bg': string;
  'mph-header-bg': string;
  'mujs-font-family': string;
  'mujs-position-top': string;
  'mujs-position-bottom': string;
  'mujs-position-left': string;
  'mujs-position-right': string;
}

export interface config {
  /** Show the floating button as soon as a video is found */
  autoinject: boolean;
  /** Open the panel maximized */
  autoexpand: boolean;
  /** Delete the videos of a tab when it is closed */
  clearTabCache: boolean;
  /** Download one video at a time */
  limitDownloads: boolean;
  /** Build HLS videos without waiting for the user */
  autoHLS: boolean;
  /** Corner of the floating button, `auto` picks it depending on the device */
  position: 'auto' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Simultaneous downloads / segments */
  concurrency: number;
  /** Time (ms) before the floating button fades, `0` disables it */
  time: number;
  theme: Theme;
}
//#endregion

//#region Media
export type MediaType = 'video' | 'photo' | 'gif' | 'audio';

/**
 * A video found on a page, the input of `Library.addVideo`
 */
export interface VideoData {
  /** Unique in the page, defaults to the address of the page */
  id?: string;
  /** Page the video comes from, defaults to the current page */
  page?: string | URL;
  title?: string;
  /** Thumbnail */
  poster?: string;
  /** Seconds */
  duration?: number;
  /** Direct files, one tile per quality (`1080p`), qualities that are listed twice are shown once */
  files?: Array<string | { src: string; label?: string }>;
  /** HLS playlists (best first) */
  ts?: string[];
  /** Show the HLS tile even though `files` also has something, because it is the better quality */
  preferHLS?: boolean;
  /** Request options (`fetch` style) required to download the media */
  hermes?: Record<string, unknown>;
}

/**
 * A tile: a quality of a video, a media of an OnlyFans post
 */
export interface MediaItem {
  /** Unique id: `<group>:<post>:<media>` */
  id: string;
  /** Download url / object url, empty when there is nothing to download (DRM, HLS playlist) */
  src: string;
  /** File name, without extension */
  title: string;
  /** Key of the group (tab) that owns it */
  group: string;
  /** Key of the post (card) that owns it */
  post: string;
  type: MediaType;
  /** Quality (`1080p`) or format (`HLS`, `TS`) shown on the tile */
  label?: string;
  /** The video built from an HLS stream, `src` is an object url */
  blob?: Blob;
  /** HLS playlists the file can be built from */
  stream?: string[];
  /** Protected: there is nothing to play or download */
  drm?: boolean;
  /** Request options (`fetch` style) */
  data: Record<string, unknown>;
  /** File extension */
  ext: string;
  /** Large preview */
  poster?: string;
  /** Square thumbnail */
  thumb?: string;
  duration?: string;
  /** Listed in the `previews` of its post (free preview) */
  preview?: boolean;
  el: HTMLElement;
}

export interface PostMedia {
  id: string;
  type: MediaType;
  /** Best quality, empty for protected media and HLS streams */
  src?: string;
  /** File name, defaults to `<user>-<id>` */
  name?: string;
  label?: string;
  stream?: string[];
  drm?: boolean;
  blob?: Blob;
  ext?: string;
  poster?: string;
  thumb?: string;
  duration?: string;
  preview?: boolean;
  data?: Record<string, unknown>;
}

/**
 * A card. `post`: an OnlyFans post (date, price, text, actions for all of its media),
 * `video`: a video of another website, its tiles are its qualities.
 */
export interface Post {
  id: string;
  variant: 'post' | 'video';
  groupKey: string;
  groupTitle: string;
  /** Creator of a post, title of a video */
  user: { name: string; username?: string; avatar?: string };
  /** Line under the name of a video: website, duration */
  meta?: string[];
  /** ISO date */
  date?: string;
  price?: number;
  isFree?: boolean;
  /** Sent in a chat, not posted on the profile */
  isMessage?: boolean;
  /** Plain text */
  text?: string;
  /** Route of the post on the website */
  original?: string;
  media: PostMedia[];
}

/**
 * The elements of a card
 */
export interface PostEntry {
  key: string;
  post: Post;
  el: HTMLElement;
  grid: HTMLElement;
  meta: HTMLElement;
  ids: Set<string>;
}

/**
 * A tab
 */
export interface MediaGroup {
  key: string;
  title: string;
  /** The tab shows how many media it holds */
  counted: boolean;
  items: Set<string>;
  pane: HTMLElement;
  tab: HTMLElement | null;
}
//#endregion

//#region Elements
declare global {
  interface HTMLElementTagNameMap {
    'count-frame': HTMLElement;
    'mu-js': HTMLElement;
    'mujs-config': HTMLElement;
    /**
     * Made to "look like" a `HTMLAnchorElement`
     */
    'mujs-a': HTMLElement;
    'mujs-body': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mujs-btn': HTMLElement;
    'mujs-post': HTMLElement;
    'mujs-tile': HTMLElement;
    'mujs-viewer': HTMLElement;
    'mujs-column': HTMLElement;
    'mujs-elem': HTMLElement;
    'mujs-empty': HTMLElement;
    'mujs-header': HTMLElement;
    'mujs-list': HTMLElement;
    'mujs-main': HTMLElement;
    'mujs-mainframe': HTMLElement;
    'mujs-root': HTMLElement;
    'mujs-row': HTMLElement;
    'mujs-section': HTMLElement;
    'mujs-toast': HTMLElement;
    'mujs-toolbar': HTMLElement;
    'mujs-url': HTMLElement;
    'tab-add': HTMLElement;
    'tab-close': HTMLElement;
    'tab-content': HTMLElement;
    'tab-host': HTMLElement;
    'tab-root': HTMLElement;
  }
}

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */
export declare function ael<
  E extends Document | Window | HTMLElement,
  M extends HTMLElementEventMap | SVGElementEventMap | WindowEventMap,
  K extends keyof M
>(
  el: E | E[] | null | undefined,
  type: K,
  listener: (this: E, ev: M[K]) => unknown | EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean
): void;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends Element = HTMLElement>(
  selector: string,
  root?: ParentNode | null
): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends Element = HTMLElement>(
  selectors: string,
  root?: ParentNode | null
): NodeListOf<E>;

/**
 * Set attributes for an element.
 * @param elem HTML element
 * @param attr Set attributes for the element
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr?: object): E;

/**
 * Creates an instance of the element for the specified tag.
 *
 * - the first attribute may be a string of classes
 * - the second attribute may be a string, used as `textContent`
 * - objects are assigned to the element (`dataset`, `style` and event handlers included)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 * @param tagName - The element to create
 * @param attributes - Set attributes for said element
 * @see {@link document.createElement}
 */
export declare function make<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  ...attributes: unknown[]
): HTMLElementTagNameMap[T];
export declare function make(tagName: string, ...attributes: unknown[]): HTMLElement;
//#endregion

//#region Sites
export interface SiteInfo {
  webpage: URL;
  /** Registrable domain, `pornhub.com` */
  host: string;
  /** Name of the website, `pornhub`, `blank` when unsupported */
  root: string;
  /** `Video`, `GIF`, `Shorties` or `Unknown` */
  pathType: string;
}

export declare class HandlePage {
  public constructor(input?: string | URL | Location);
  public static HOST: Record<string, { domains: string[] }>;
  public static toURL(input?: string | URL | Location): URL;
  public static resolve(input?: string | URL | Location): SiteInfo;
  public static palette(root: string): Record<string, string>;
  public static placement(corner?: string, root?: string, mobile?: boolean): Record<string, string>;
  public setCurrent(input: string | URL | Location): this;
  public get current(): SiteInfo;
  public get webpage(): URL;
  public get host(): string;
  public get root(): string;
  public get palette(): Record<string, string>;
  public mobileFix(): boolean;
}
//#endregion
