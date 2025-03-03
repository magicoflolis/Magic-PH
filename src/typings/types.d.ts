export type config = {}

export declare function hasOwn(obj: object, prop: string): boolean;

export declare function objToStr<O>(obj: O): string;

export declare function strToURL<S extends string | URL>(str: S): URL;

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

/**
 * Type is not 100% accurate
 */
export declare function normalizeTarget<T>(
  target: T,
  toQuery: boolean,
  root: Element | Document
): T[];

export declare function halt(evt: Event): void;

declare global {
  interface HTMLElementTagNameMap {
    'main-userjs': HTMLElement;
    /**
     * Made to "look like" a `HTMLAnchorElement`
     */
    'mph-a': HTMLElement;
    'mph-addtab': HTMLElement;
    'mph-body': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mph-btn': HTMLElement;
    'mph-column': HTMLElement;
    'mph-elem': HTMLElement;
    'mph-host': HTMLElement;
    'mph-header': HTMLElement;
    'mph-list': HTMLElement;
    'mph-main': HTMLElement;
    'mph-root': HTMLElement;
    'mph-row': HTMLElement;
    'mph-section': HTMLElement;
    'mph-tabs': HTMLElement;
    'mph-tab': HTMLElement;
    'mph-title': HTMLElement;
    'mph-toolbar': HTMLElement;
    'mph-url': HTMLElement;
  }
}

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
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends HTMLElement, S extends string>(selector: S, root: E): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends HTMLElement, S extends string>(
  selectors: S,
  root: E
): ReturnType<E['querySelectorAll']>;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function query<E extends Element>(selector: string, root: E): Promise<E | null>;

/**
 * Set attributes for an element.
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr: keyof E): E;

/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 * @param cname A className for the element.
 * @param attrs Set attributes for the element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 */
export declare function make<K extends keyof HTMLElementTagNameMap, A extends keyof HTMLElementTagNameMap[K]>(
  tagName: K,
  cname?: string,
  attrs?: {
    [key in A]: unknown;
  }
): HTMLElementTagNameMap[K];

/**
 * Based on uBlock Origin by Raymond Hill (https://github.com/gorhill/uBlock)
 *
 * [uBlock Origin Reference](https://github.com/gorhill/uBlock/blob/master/src/js/dom.js)
 */
export interface dom {
  attr<T extends HTMLElement, A extends string, V extends unknown>(
    target: T,
    attr: A,
    value?: V
  ): V extends ReturnType<T['getAttribute']> ? V : void;
  prop<T extends HTMLElement, P extends keyof T, V extends T[keyof T]>(
    target: T,
    prop: P,
    value?: V
  ): V | undefined;
  text<T extends HTMLElement, V extends unknown>(target: T, text?: V): string | null | undefined;
  cl: {
    add<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    remove<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    toggle<T extends HTMLElement>(target: T, token: string | string[], force?: boolean): boolean;
    has<T extends HTMLElement>(target: T, token: string | string[]): boolean;
  };
}

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

export declare function setObj<X, Y>(objA: X = {}, objB: Y = {}): Y;
