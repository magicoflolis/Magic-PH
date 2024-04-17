export declare function objToStr<O>(obj: O): string;

export declare function mkURL(str: string): URL;

/**
 * Object is typeof `RegExp`
 */
export declare function isRegExp<O>(obj: O): boolean;

/**
 * Object is typeof `Element`
 */
export declare function isElem<O>(obj: O): boolean;

/**
 * Object is typeof `object` / JSON Object
 */
export declare function isObj<O>(obj: O): boolean;

/**
 * Object is typeof `Function`
 */
export declare function isFN<O>(obj: O): boolean;

/**
 * Object is `null` or `undefined`
 */
export declare function isNull<O>(obj: O): boolean;

/**
 * Object is Blank
 */
export declare function isBlank<O>(obj: O): boolean;

/**
 * Object is Empty
 */
export declare function isEmpty<O>(obj: O): boolean;

export declare function normalizeTarget<T>(target: T, toQuery: boolean): T[];

export declare function halt(evt: Event): void;

/**
 * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
 *
 * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
 *
 * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
 *
 * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
 *
 * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
 *
 * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
 *
 * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */
export declare function ael<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  el: E,
  type: K,
  listener: (this: E, ev: HTMLElementEventMap[K]) => any,
  options?: AddEventListenerOptions | boolean
): void;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends Element>(selectors: string, root: E): NodeListOf<E>;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends Element>(selector: string, root: E): E | null;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function query<E extends Element>(selector: string, root: E): Promise<E | null>;

/**
 * Form Attributes of Element
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr: keyof E = {}): E;

/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 */
export declare function make<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  cname: string,
  attrs: keyof HTMLElement
): HTMLElementTagNameMap[K];

export declare function loadCSS(css: string, name: string = 'CSS'): HTMLStyleElement | undefined;

export declare function observe<E extends Node>(
  element: E,
  listener: MutationCallback,
  options: MutationObserverInit = { subtree: true, childList: true }
): MutationObserver;
// (this: E, mutations: MutationRecord[], observer: MutationObserver) => any,

export declare function setObj<X, Y>(objA: X = {}, objB: Y = {}): Y;

type Sites = {
  [key in SiteKey]?: {
    domains: string[];

    domain: SiteKey;
    webpage: URL;
    host: string;

    validDomain?: boolean;
    validPath?: boolean;
    pathType?: string;
    root?: string;
    // maps: Sites[keyof Sites];
  };
};

type SiteKey =
  | 'pornhub'
  | 'youporn'
  | 'redtube'
  | 'tube8'
  | 'thumbzilla'
  | 'onlyfans'
  | 'xhamster'
  | 'xnxx'
  | 'xvideos'
  | 'beeg';

type PageHosts = {
  pornhub: {
    domains: ['pornhub.com', 'pornhubpremium.com'];
  };
  youporn: {
    domains: ['youporn.com', 'youporngay.com', 'youpornpremium.com'];
  };
  redtube: {
    domains: ['redtube.com', 'redtubepremium.com'];
  };
  tube8: {
    domains: ['tube8.com'];
  };
  thumbzilla: {
    domains: ['thumbzilla.com'];
  };
  onlyfans: {
    domains: ['onlyfans.com'];
  };
  xhamster: {
    domains: ['xhamster.com'];
  };
  xnxx: {
    domains: ['xnxx.com'];
  };
  xvideos: {
    domains: ['xvideos.com'];
  };
  beeg: {
    domains: ['beeg.com'];
  };
};
type DomainMaps = {
  Routes: Map<string, any>;
  Video: {
    title: 'MagicPH';
    mediaFiles: [];
    playerId: 0;
  };
};
type PathMaps = {
  // Domains: Map<SiteKey, Map<SiteKey, Sites[keyof Sites]>>;
  Domains: Map<SiteKey, Map<keyof DomainMaps, Sites[keyof Sites]>>;
  Page: {
    domains: string[];

    domain: SiteKey;
    webpage: URL;
    host: string;

    validDomain?: boolean;
    validPath?: boolean;
    pathType?: string;
    root?: string;
    // maps: Sites[keyof Sites];
  };
};

export class HandlePage {
  constructor<U extends string>(url?: U);

  public videoDefaults: {
    title: 'MagicPH';
    mediaFiles: string[];
    playerId: 0;
  };

  // public get current(): {
  //   domain: string;
  //   webpage: URL;
  //   validPath?: boolean;
  //   pathType?: string;
  //   validDomain?: boolean;
  //   root?: string;
  // };
  public get current(): PathMaps["Page"];

  public set current<U>(url: U): this;

  public hosts: {
    [key in SiteKey]: {
      domains: string[];
    };
  };
  public pathMap: Map<keyof PathMaps, PathMaps[keyof PathMaps]>;
  public Domains: PathMaps['Domains'];
}

/**
 * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
 * @param url Specifies a MIME type for the document.
 *
 * [Violentmonkey Reference](https://violentmonkey.github.io/api/gm/#gm_openintab)
 *
 * [Greasespot Reference](https://wiki.greasespot.net/GM.openInTab)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/open)
 */
export declare function openTab(url: string | URL): WindowProxy | null;
