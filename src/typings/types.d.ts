// @ts-check

/**
 * Emulates the second parameter of `Array.from(items, mapFn)`:
 * called with each element `v` and its index `k`.
 */
type mapFn<V = unknown, U = unknown> = (v: V, k: number) => U;

interface arrayArgs {
  /**
   * What is returned for {@link Array.from}:
   * - {@link Object.entries}
   * - {@link Set.entries}
   * - {@link Map.entries}
   */
  entries: boolean;
  /**
   * What is returned for {@link Array.from}:
   * - {@link Object.keys}
   * - {@link Set.keys}
   * - {@link Map.keys}
   */
  keys: boolean;
  /**
   * What is returned for {@link Array.from}:
   * - {@link Object.values}
   * - {@link Set.values}
   * - {@link Map.values}
   */
  values: boolean;
  /**
   * Same as the second parameter of {@link Array.from}.
   * Applied to every element of the resulting array.
   */
  mapFn: mapFn;
}

/** The array `toArray` produces before `mapFn` is applied (unchanged from your original). */
type arrayBase<T, A, R> = T extends null | undefined
  ? []
  : T extends readonly unknown[]
    ? T
    : T extends Window | Document
      ? [T]
      : T extends HTMLElement
        ? T[]
        : T extends string
          ? R extends Element | Document
            ? Element[]
            : R extends string
              ? string[]
              : A extends Pick<arrayArgs, 'keys'>
                ? T[]
                : [T]
          : A extends Pick<arrayArgs, 'entries'>
            ? T extends Record<infer K, infer V>
              ? Array<[K extends string ? K : string, V]>
              : Array<[string, unknown]>
            : A extends Pick<arrayArgs, 'keys'>
              ? T extends Record<infer K, unknown>
                ? Array<K extends string ? K : string>
                : T extends Set<unknown> | Map<infer K, unknown>
                  ? K[]
                  : string[]
              : A extends Pick<arrayArgs, 'values'>
                ? T extends Record<string, infer V>
                  ? V[]
                  : T extends Set<infer V> | Map<unknown, infer V>
                    ? V[]
                    : unknown[]
                : T extends Iterable<infer U>
                  ? U[]
                  : unknown[];

/** Element type of an array or tuple. */
type arrayElement<X> = X extends readonly (infer E)[] ? E : never;

/** `U[]` when a `mapFn` was supplied, otherwise the unmapped array. */
type arrayReturns<T, A, R, U = never> = [U] extends [never] ? arrayBase<T, A, R> : U[];

/**
 * @param target - Transform into array. When target is a type of {@link String} and `args: { keys: true }`, this function will return `[...target]` and other `args: { ... }` will return `[target]`
 * @param args - When `undefined`, this function will return `Array.from(target)`. When both target and root are a type of {@link String} and `args: { keys: true }`, this function will return `target.split(root)`. `args.mapFn` behaves like the second parameter of {@link Array.from}.
 * @param root - When both target and root are a type of {@link String}, this function will return `root.querySelectorAll(target)`.
 */
export declare function toArray<
  T,
  A extends Partial<Omit<arrayArgs, 'mapFn'>> = object,
  R = undefined,
  U = never
>(
  target: T,
  args?: A & { mapFn?: mapFn<arrayElement<arrayBase<T, A, R>>, U> },
  root?: R
): arrayReturns<T, A, R, U>;

//#region Config
export interface Theme {
  'mph-site-color': string;
  'mph-hover-color': string;
  'mph-background-color': string;
  'mph-border-color': string;
  'mph-text-color': string;
  'mph-root-bg': string;
  'mph-header-bg': string;
  'mph-font-family': string;
  'mph-position-top': string;
  'mph-position-bottom': string;
  'mph-position-left': string;
  'mph-position-right': string;
}

export interface MPHConfig {
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
  nativePlayer: boolean;
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
  postData?: Post;
  photos?: PostMedia[];
  viewerOnly?: boolean;
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
export interface PostCard {
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

/**
 * Information about a supported website / page.
 */
export interface SiteInfo {
  webpage: URL;
  /** Registrable domain, `pornhub.com` */
  host: string;
  /** Name of the website, `pornhub`, `blank` when unsupported */
  root: string;
  /** `Video`, `GIF`, `Shorties` or `Unknown` */
  path: string;
  router?: { push: (path: string) => unknown };
}

/**
 * Users store state.
 *
 * Merged from two snapshots. Entries in `items` come in several shapes,
 * depending on where the user was loaded from (see `view` / `_view`):
 *   - minimal chat-list card   (`view.cl`, `_view: "m"`)
 *   - recommendation / friend card (`view.r`)
 *   - full profile page        (`view.f`, `_view: "a"`)
 *   - the authenticated user   (`view.f`, `isAuth: true`)
 * Fields present on every entry are required; everything else is optional.
 */
export interface OFUsers {
  needResetCheckOnlines: boolean;
  deferredOnlines: number[];
  /** User IDs whose online status is polled */
  checkOnlines: number[];

  /** Users keyed by user ID */
  items: {
    [userId: string]: {
      // ── Present on every entry ─────────────────────────────────────────
      id: number;
      name: string;
      username: string;
      displayName: string;
      avatar: string | null;
      avatarThumbs: {
        c50: string;
        c144: string;
      } | null;
      openseaInfo: {
        isConnected: boolean;
        permalink: string | null;
        openseaProfileLink: string | null;
        hasNft: boolean;
      };
      /** Load timestamps (ms) keyed by source: cl = chat list, m = messages, f = full, r = recommendations */
      view: {
        cl?: number;
        m?: number;
        f?: number;
        r?: number;
      };
      canLookStory: boolean;
      canCommentStory: boolean;
      hasNotViewedStory: boolean;
      isVerified: boolean;
      canPayInternal: boolean;
      friendsList: unknown[];

      // ── View markers ───────────────────────────────────────────────────
      _view?: 'm' | 'a' | (string & {});
      _views?: string[];

      // ── Header image ───────────────────────────────────────────────────
      header?: string | null;
      headerSize?: {
        width: number;
        height: number;
      } | null;
      headerThumbs?: {
        w480: string;
        w760: string;
      } | null;

      // ── Card / creator fields ──────────────────────────────────────────
      hasStories?: boolean;
      hasStream?: boolean;
      hasScheduledStream?: boolean;
      canEarn?: boolean;
      canAddSubscriber?: boolean;
      isPerformer?: boolean;
      isRealPerformer?: boolean;
      isAdultContent?: boolean;
      canTrialSend?: boolean;
      isBlocked?: boolean;
      isRestricted?: boolean;
      canRestrict?: boolean;
      canReport?: boolean;
      isFriend?: boolean;
      isActive?: boolean;
      isSuspended?: boolean;
      isPaywallRequired?: boolean;
      isFree?: boolean;
      hasPromotion?: boolean;
      notice?: string;
      allowIncomingCalls?: boolean;
      /** ISO 8601 */
      lastSeen?: string | null;

      // ── Tips / pricing ─────────────────────────────────────────────────
      tipsEnabled?: boolean;
      tipsTextEnabled?: boolean;
      tipsMin?: number;
      tipsMinInternal?: number;
      tipsMax?: number;
      subscribePrice?: number;
      currentSubscribePrice?: number | null;
      subscriptionBundles?: number[];
      promotions?: unknown[];

      // ── Subscription state ─────────────────────────────────────────────
      /** You are subscribed to this user */
      subscribedBy?: boolean | null;
      subscribedByExpire?: boolean | null;
      /** ISO 8601 */
      subscribedByExpireDate?: string | null;
      subscribedByAutoprolong?: boolean | null;
      subscribedIsExpiredNow?: boolean | null;
      subscribedByData?: unknown;
      /** This user is subscribed to you */
      subscribedOn?: boolean;
      subscribedOnExpire?: boolean | null;
      subscribedOnExpiredNow?: boolean | null;
      /** e.g. "3 months" */
      subscribedOnDuration?: string | null;
      subscribedOnData?: unknown;
      isPendingAutoprolong?: boolean;
      canUnsubscribe?: boolean;

      listsStates?: Array<{
        /** "following" | "fans" | "purchased", or a numeric list ID as a string */
        id: string;
        type: 'following' | 'bookmarks' | 'fans' | 'purchased' | (string & {});
        name: string;
        hasUser: boolean;
        canAddUser: boolean;
        cannotAddUserReason: 'ALREADY_EXISTS' | (string & {}) | null;
      }>;

      // ── Full profile fields ────────────────────────────────────────────
      /** ISO 8601 */
      joinDate?: string;
      /** HTML */
      about?: string;
      isMarkdownDisabledForAbout?: boolean;
      website?: string | null;
      wishlist?: string | null;
      location?: string | null;
      isReferrerAllowed?: boolean;
      postsCount?: number;
      archivedPostsCount?: number;
      privateArchivedPostsCount?: number;
      photosCount?: number;
      videosCount?: number;
      audiosCount?: number;
      mediasCount?: number;
      favoritesCount?: number;
      favoritedCount?: number;
      subscribersCount?: number;
      showPostsInFeed?: boolean;
      showSubscribersCount?: boolean;
      showMediaCount?: boolean;
      canReceiveChatMessage?: boolean;
      canChat?: boolean;
      canInitiateCall?: boolean;
      isSpotifyConnected?: boolean;
      isSpringConnected?: boolean;
      hasPinnedPosts?: boolean;
      hasLabels?: boolean;
      hasLinks?: boolean;
      hasFriends?: boolean;
      avatarHeaderConverterUpload?: boolean;
      isPrivateRestriction?: boolean;
      canCreatePromotion?: boolean;
      canCreateTrial?: boolean;
      finishedStreamsCount?: number;
      shouldShowFinishedStreams?: boolean;
      hasSavedStreams?: boolean;
      /** ISO 8601 */
      firstPublishedPostDate?: string;
      isSwedenFan?: boolean;

      // ── Authenticated user only ────────────────────────────────────────
      isAuth?: boolean;
      csrf?: string;
      email?: string;
      isEmailChecked?: boolean;
      isEmailRequired?: boolean;
      upload?: {
        geoUploadArgs: {
          preset: string;
          protected_preset: string;
          preset_public: string;
          preset_png: string;
          isDelay: boolean;
          needThumbs: boolean;
          additional: {
            user: string;
          };
        };
      };
      wsUrl?: string;
      /** JWT */
      wsAuthToken?: string;
      isMediaAvatarPending?: boolean;
      isMediaHeaderPending?: boolean;
      canUploadMedia?: boolean;
      canUploadAvatarHeader?: boolean;
      canSendChatToAll?: boolean;
      canCreateLists?: boolean;
      canPinPost?: boolean;
      pinnedPostsCount?: number;
      maxPinnedPostsCount?: number;
      isPaywallPassed?: boolean;
      isOnline?: boolean;
      isVisibleOnline?: boolean;
      isWantComments?: boolean;
      isDeleteInitiated?: boolean;
      subscribesCount?: number;
      hasPurchasedPosts?: boolean;
      hasRecentlyExpired?: boolean;
      paidFeed?: boolean;
      advBlock?: unknown[];
      hasScenario?: boolean;
      enabledImageEditorForChat?: boolean;
      unreadTips?: number;

      // Credits / wallet / payments
      creditsMin?: number;
      creditsMax?: number;
      creditsMinAlternatives?: number;
      creditBalance?: number;
      isCreditsEnabled?: boolean;
      isMakePayment?: boolean;
      hasInternalPayments?: boolean;
      payPalStatus?: unknown[];
      isPaymentCardConnected?: boolean;
      isRealCardConnected?: boolean;
      canAddCard?: boolean;
      isWalletAutorecharge?: boolean;
      walletAutorechargeAmount?: number;
      walletAutorechargeMin?: number;
      walletFirstRebills?: boolean;
      canAlternativeWalletTopUp?: boolean;
      payoutLegalApproveState?: 'none' | (string & {});
      isLegalApprovedAllowed?: boolean;

      // Notifications / counters
      notificationsCount?: number;
      chatMessagesCount?: number;
      countPinnedChat?: number;
      countPriorityChat?: number;
      countCallRequestChat?: number;
      newTagsCount?: number;
      hasTags?: boolean;
      hasNewAlerts?: boolean;
      hasNewHints?: boolean;
      hasNewChangedPriceSubscriptions?: boolean;
      hasSystemNotifications?: boolean;
      hasNewTicketReplies?: {
        open: boolean;
        solved: boolean;
        closed: boolean;
        appeal_form: boolean;
      };

      // Watermark
      watermarkText?: string;
      hasWatermarkPhoto?: boolean;
      hasWatermarkVideo?: boolean;
      watermarkPosition?: 'bottom_right' | (string & {});

      // Social / connected accounts
      isTwitterConnected?: boolean;
      twitterUsername?: string | null;
      isAllowTweets?: boolean;
      connectedOfAccounts?: unknown[];
      canConnectOfAccount?: boolean;

      // Verification / consent / security
      isAgeVerified?: boolean;
      ageVerificationRequired?: boolean;
      isOtpEnabled?: boolean;
      needConsent?: boolean;
      needConsentState?: unknown | null;
      consentStatus?: unknown | null;
      needIVApprove?: boolean;
      ivStatus?: string | null;
      ivDocExpired?: boolean;
      ivFailReason?: string | null;
      ivCountry?: string | null;
      ivFlow?: 'default' | (string & {});
      faceIdRegular?: unknown[];
    };
  };
  notFoundUsers: unknown[];
  /** ID of the profile currently being viewed */
  currentUser: number | null;
  modalUser: unknown | null;
  modalPost: unknown | null;
  modalStory: unknown | null;
  online: number[];
  recommendedUsers: unknown[];
  recentlyExpiredUsers: unknown[];
  recommendedAuthor: unknown | null;
  isRecommendsFree: boolean;
  userAlert: unknown | null;
  blocked: unknown[];
  restricted: unknown[];
  blockedOffset: number;
  restrictedOffset: number;
  // Search
  search: unknown[];
  searchQuery: string;
  searchRequestId: number;
  searchAutocomplete: unknown[];
  /** Misspelling is in the source data */
  purchasedAuthorAutocmoplete: unknown[];
  settingsPost: {
    isEnabled: boolean;
    currentCode: string | null;
    options: unknown[];
  };
  settingsChat: {
    isEnabled: boolean;
    currentCode: string | null;
    options: unknown[];
  };
  subscriptionsCount: {
    subscriptions: {
      active: number | null;
      muted: number | null;
      restricted: number | null;
      expired: number | null;
      all: number | null;
      attention: number | null;
      blocked: number | null;
    };
    subscribers: {
      active: number | null;
      muted: number | null;
      restricted: number | null;
      expired: number | null;
      all: number | null;
      blocked: number | null;
      activeOnline: number | null;
    };
  };
  subscriptionsCountTimestamp: number;
  isFetchingSubscriptionsCount: boolean;
  // Friends (keyed by profile user ID → friend user IDs)
  friends: Record<string, number[]>;
  pinnedFriends: Record<string, number[]>;
  friendsLoading: boolean;
  hasMoreFriends: boolean;
  forceFriendsReload: boolean;
  /** Social links keyed by profile user ID */
  socialButtons: Record<
    string,
    Array<{
      id: number;
      sort: number;
      label: string;
      username: string;
      socialMedia: 'instagram' | 'x' | (string & {});
      link: string;
      url: string;
      isValid: boolean;
    }>
  >;
  links: unknown[];
  userLinks: unknown | null;
  nfts: unknown[];
  profileDataLoadingError: boolean;
  // Notifications
  notifications: unknown[];
  notificationsType: string;
  notificationsCounts: {
    all: number;
    commented: number;
    favorited: number;
    mentioned: number;
    tags: number;
    message: number;
    purchases: number;
    subscribed: number;
    tip: number;
    deactivated_media: number;
    memories: number;
  };
  notificationsOrder: string[];
  notificationIsSearch: boolean;
  banners: unknown[];
  isBannersLoading: boolean;
  customDataSaving: boolean;
  streamSettings: {
    data: Record<string, unknown>;
    dataLoaded: boolean;
  };
  preLoginSubscriptionData: unknown | null;
  privateCallSettings: {
    allowIncomingCalls: boolean;
    audioCallsPrice: number | null;
    videoCallsPrice: number | null;
  };
}

export interface OFChatMedia {
  id: number;
  type: 'video' | 'photo' | 'gif' | 'audio' | 'stream';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string | null;
  isReady: boolean;
  /** Seconds; 0 for photos */
  duration: number;
  hasCustomPreview: boolean;
  /** Keyed by resolution ("240", "720", ...) */
  videoSources: {
    [resolution: string]: string | null;
  };
  files: {
    full: {
      url: string | null;
      width: number;
      height: number;
      size: number;
      sources: unknown[];
    };
    thumb: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    preview: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    squarePreview: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    /** Present on DRM-protected video */
    drm?: {
      manifest: {
        hls: string;
        dash: string;
      };
      signature: {
        hls: {
          'CloudFront-Policy': string;
          'CloudFront-Signature': string;
          'CloudFront-Key-Pair-Id': string;
        };
        dash: {
          'CloudFront-Policy': string;
          'CloudFront-Signature': string;
          'CloudFront-Key-Pair-Id': string;
        };
      };
    };
  };
}

export interface OFMedia {
  id: number;
  type: 'video' | 'photo' | 'gif' | 'audio' | 'stream';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string | null;
  isReady: boolean;
  /** Seconds */
  duration: number;
  hasCustomPreview: boolean;
  /** Keyed by resolution ("240", "720", ...) */
  videoSources: {
    [resolution: string]: string | null;
  };
  files: {
    full: {
      url: string | null;
      width: number;
      height: number;
      size: number;
      sources: unknown[];
    };
    thumb: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    preview: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    squarePreview: {
      url: string | null;
      width: number;
      height: number;
      size: number;
    };
    drm?: {
      manifest: {
        hls: string;
        dash: string;
      };
      signature: {
        hls: {
          'CloudFront-Policy': string;
          'CloudFront-Signature': string;
          'CloudFront-Key-Pair-Id': string;
        };
        dash: {
          'CloudFront-Policy': string;
          'CloudFront-Signature': string;
          'CloudFront-Key-Pair-Id': string;
        };
      };
    };
  };
}

/**
 * Chats / messages store state.
 *
 * Merged from two snapshots of the same store (a chat open vs. no chat open).
 * Message entries come in two shapes: a slim list preview (the last message
 * of each chat) and a fully loaded message (inside an opened chat). Fields
 * only present on fully loaded messages are optional.
 */
export interface OFChats {
  /** Chat user IDs in list order */
  chats: number[];

  /** Chat metadata keyed by the other user's ID */
  items: {
    [userId: string]: {
      withUser: number;
      canNotSendReason: string | null;
      canSendMessage: boolean;
      canGoToProfile: boolean;
      /** Observed as a number, or `false` when there are none */
      unreadMessagesCount: number | false;
      hasUnreadTips: boolean;
      isMutedNotifications: boolean;
      /** ID of the latest message (key into `messages`) */
      lastMessage: number;
      /** Observed as both a numeric string and a number */
      lastReadMessageId: string | number;
      hasPurchasedFeed: boolean;
      countPinnedMessages: number;
      isCallReady: boolean;
      /** Loaded message IDs for this chat (empty until the chat is opened) */
      messages: number[];
      typing: boolean;
      /** Absent, null, a numeric string, or a number */
      newMessageId?: string | number | null;
    };
  };

  /** User ID of the open chat, as a string; null when none is open */
  currentChat: string | null;

  /** Messages keyed by message ID */
  messages: {
    [messageId: string]: {
      // Present on every message (list previews and full messages)
      id: number;
      isOpened: boolean;
      /** ISO 8601 */
      createdAt: string;
      /** HTML-formatted body */
      text: string;
      giphyId: string | null;
      lockedText: boolean;
      isFree: boolean;
      mediaCount: number;
      isTip: boolean;
      fromUser: number;
      likePrevent: boolean;
      isMediaPlayed: boolean;

      // Present only on fully loaded messages
      responseType?: 'message';
      price?: number;
      isMediaReady?: boolean;
      previews?: unknown[];
      releaseForms?: unknown[];
      isReportedByMe?: boolean;
      isCouplePeopleMedia?: boolean;
      isMarkdownDisabled?: boolean;
      queueId?: number;
      isFromQueue?: boolean;
      canUnsendQueue?: boolean;
      unsendSecondsQueue?: number;
      isCanceled?: boolean;
      isNew?: boolean;
      /** ISO 8601 */
      changedAt?: string;
      cancelSeconds?: number;
      isLiked?: boolean;
      canPurchase?: boolean;
      canPurchaseReason?: 'free' | 'not_available' | (string & {});
      canReport?: boolean;
      canBePinned?: boolean;
      isPinned?: boolean;
      isAddedToBookmarks?: boolean;
      chatUserId?: number;
      chatId?: number;
      /** ID of the message being replied to */
      replyToMessage?: number;

      media?: Array<OFChatMedia>;
    };
  };

  /** Pagination flags for loaded chats, keyed by chat user ID */
  messagesHasMore: {
    [userId: string]: {
      top: boolean;
      bottom: boolean;
    };
  };

  // Loading / UI state
  chatsLoading: boolean;
  chatsListLoading: boolean;
  sendMessageLoading: boolean;
  chatsListHasMore: boolean;
  emptyMessagesList: boolean;
  firstLoadingChatsList: boolean;
  firstLoadingMessagesList: boolean;
  hasMoreUsers: boolean;
  nextOffset: number;
  messageIdToCentered: number | null;

  // Search
  searchIds: unknown[];
  currentSearchIndex: number | null;
  searchQuery: string;

  // Sorting / filtering
  chatsSort: 'newest' | (string & {});
  chatsFilter: string | null;

  // Mass messaging / queue
  usersTotal: number;
  selectedUsersIdsCount: number;
  selectedUsers: unknown[];
  queueIds: unknown[];
  queueItems: Record<string, unknown>;
  queueBuyersMarker: number;
  queueBuyersIds: unknown[];
  queueBuyersError: boolean;
  scheduleQueueMessage: unknown | null;
  showViewAllInclude: boolean;
  selectViewAllInclude: unknown[];
  showViewAllExclude: boolean;
  selectViewAllExclude: unknown[];
  media: unknown[];
}

/**
 * Posts response keyed by post ID (stringified numeric ID).
 */
export interface OFPosts {
  [postId: string]: {
    id: number;
    author: number;
    responseType: 'post';
    // responseType: 'post' | (string & {});

    // Permissions
    canComment: boolean;
    canDelete: boolean;
    canEdit: boolean;
    canEditExpire: boolean;
    canEditMedia: boolean;
    canEditSchedule: boolean;
    canEditText: boolean;
    canEditVote: boolean;
    canReport: boolean;
    canToggleFavorite: boolean;
    canViewMedia: boolean;

    // Counts
    commentsCount: number;
    favoritesCount: number;
    mediaCount: number;

    // State flags
    hasUrl: boolean;
    hasVoting: boolean;
    isAddedToBookmarks: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    isFavorite: boolean;
    isMediaReady: boolean;
    isOpened: boolean;
    isPinned: boolean;
    isPrivateArchived: boolean;
    isPublishedWithPeriod: boolean;
    isMarkdownDisabled: boolean;
    lockedText: boolean;

    // Timestamps
    /** ISO 8601, e.g. "2026-10-18T14:00:02+00:00" */
    postedAt: string;
    /** Unix seconds with fractional part, as a string, e.g. "1792332002.000000" */
    postedAtPrecise: string;
    /** ISO 8601 or null */
    expiredAt: string | null;

    // Content
    /** HTML-formatted post body */
    text: string;
    rawText: string;
    price: number | null;
    streamId: number | null;
    /** Empty object when the post has no poll */
    voting: Record<string, unknown>;
    media: Array<OFMedia>;
    // Arrays that were empty in the sample — element shape unknown
    preview: unknown[];
    labelStates: unknown[];
    linkedPosts: unknown[];
    linkedUsers: unknown[];
    mentionedUsers: unknown[];
    releaseForms: unknown[];
    streamEvents: unknown[];
    favoritesList: unknown[];
    tipsList: unknown[];
    buyersList: unknown[];
  };
}

export interface OFStore {
  posts?: OFPosts;
  chats?: OFChats;
  users?: OFUsers;
}

//#region xHampster

// ─── Primitives ──────────────────────────────────────────────────────────────

/** Absolute (`https://…`), protocol-relative (`//…`) or root-relative (`/…`) URL. */
export type Url = string;
/** Unix epoch time in seconds. */
export type UnixSeconds = number;
/** Numeric boolean flag used by the backend. */
export type Bit = 0 | 1;
export type Nullable<T> = T | null;
/** Literal union that keeps VSCode autocomplete but still accepts any string. */
export type LooseString<T extends string> = T | (string & {});
/** Object of boolean flags built from a key union. */
export type BoolFlags<K extends string> = { [P in K]: boolean };
/** Recursive readonly view, handy for frozen hydration state. */
export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T;

export type Orientation = LooseString<'straight' | 'gay' | 'shemale'>;
export type VideoHeight = '144p' | '240p' | '480p' | '720p' | '1080p' | '2160p';
export type Quality = LooseString<'auto' | VideoHeight>;
export type Resolution = [width: number, height: number];
export type SiteKind = LooseString<'desktop' | 'mobile'>;

export interface Experiment {
  group: string;
  version: number;
}
/** Keyed by experiment id, e.g. `"7037"`. */
export type Experiments = Record<`${number}`, Experiment>;

// ─── Ads & widgets ───────────────────────────────────────────────────────────

/** TrafficStars ad spot parameters. */
export interface AdSpot {
  spot: string;
  /** JSON-encoded page context. */
  subid_2: string;
  subid_4?: string;
  /** Experiment list as `id:version:group,…`. */
  subid_6: string;
  /** JSON-encoded extra params. */
  subid_7: string;
  xsrc?: string;
  xvr: Bit;
  xoc: Orientation;
  xprf?: string;
  xch?: string;
  /** Comma-separated keywords. */
  keywords: string;
  xma: Bit;
  xu: string;
  cookie: Bit;
  xuv: Bit;
  sfw: Bit;
  containerId: string;
  domain: string;
  mc: string;
  nativeSettings: { autoplay: boolean; adsByUrl: Url };
  wrapperStyles: { width: string; height: string };
  widgetName?: string;
  showType?: string;
}

export interface CamsWidget {
  country: string;
  titleLink: Url;
  moreGirlsLink: Url;
  logoLink: Url;
  moreGirlsText: string;
  /** Contains inline HTML. */
  titleText: string;
  /** Template with a `{title}` placeholder. */
  thumbLink: Url;
  widgetName: string;
  segment: string;
  /** HTML-entity-encoded JSON. */
  frontObject: string;
}

export interface TsImpressionStats {
  isTsImpressionCollected: boolean;
}

export interface AdBanner {
  master: AdSpot;
  widget: CamsWidget;
  statistics: TsImpressionStats;
}

// ─── Ratings, subscriptions, tags ────────────────────────────────────────────

export interface RatingModel {
  modelName: string;
  entityModel: string;
  entityID: number;
  likes: number;
  dislikes: number;
  /** Percentage, 0–100. */
  value: number;
  state: number;
  isMoment: boolean;
}

export interface SubscriptionModel {
  modelName: string;
  preferredPersonType: Nullable<string>;
  id: number;
  subscribed: boolean;
  subscribers: number;
  signupSource: Nullable<string>;
}

export interface FhDiscount {
  id: number;
  discount: Nullable<number>;
  count: number;
}

export interface ChannelInfo {
  isAggregator: boolean;
  subscribers: Nullable<number>;
  rating: number;
}

export type TagKindFlags = BoolFlags<
  | 'isChannel'
  | 'isBrand'
  | 'isCategory'
  | 'isLanguage'
  | 'isTag'
  | 'isPornstar'
  | 'isCeleb'
  | 'isCreator'
  | 'isAdShareProducer'
  | 'isUser'
>;

export interface Tag extends TagKindFlags {
  id: Nullable<number>;
  uid: Nullable<string>;
  name: string;
  nameEn: Nullable<string>;
  slug: Nullable<string>;
  isVerified: boolean;
  url: Url;
  thumbUrl: Nullable<Url>;
  isUserInactive: boolean;
  isUserDeactivated: boolean;
  hasL10n: boolean;
  country: Nullable<string>;
  subscriptionModel: Nullable<SubscriptionModel>;
  fhStudioId: Nullable<number>;
  xhlUid: Nullable<string>;
  fhDiscount: Nullable<FhDiscount>;
  features: unknown;
  channelInfo: Nullable<ChannelInfo>;
  views30d: number;
  gender: Nullable<string>;
  isBlurred: boolean;
  primaryIcon: Nullable<string>;
  secondaryIcon: Nullable<string>;
  primaryIconColor: Nullable<string>;
  isUploader: boolean;
  hasChannelLogo: boolean;
}

// ─── Video lists ─────────────────────────────────────────────────────────────

export interface Landing {
  type: LooseString<'user' | 'person' | 'channel'>;
  id: number;
  name: string;
  logo: Url;
  link: Url;
  subscribers: Nullable<number>;
  isInactive: boolean;
  isDeactivated: boolean;
}

export interface VideoThumb {
  id: number;
  duration: number;
  created: UnixSeconds;
  title: string;
  thumbId: number;
  videoType: string;
  pageURL: Url;
  thumbURL: Url;
  imageURL: Url;
  previewThumbURL: Url;
  icon: Nullable<string>;
  spriteURL: Url;
  trailerURL: Url;
  trailerFallbackUrl: Url;
  isUHD?: boolean;
  views: number;
  landing: Landing;
  attributes: { 'data-role': string; 'data-page': number };
  classes: string;
  userCountry: string;
  isThumbCustom?: boolean;
  isAdminCustomThumb: boolean;
}

export interface ThumbWidgetItem {
  type: string;
  id: string;
  position: number;
  props: {
    tsThumbWidgetProps: {
      widgetId: string;
      widgetParams: AdSpot;
      widgetUrl: Url;
      position: number;
      isImpressionCollected: boolean;
    };
    xhlThumbWidgetDesktopProps: {
      thumbWidget: Pick<CamsWidget, 'thumbLink' | 'widgetName' | 'frontObject'> & {
        position: number;
        showType: string;
      };
      classes: string;
    };
  };
}

/** Compact video card used by the player and its related list. */
export interface VideoInfo {
  idHash: string;
  url: Url;
  title: string;
  thumbUrl: Url;
  duration: number;
  views: number;
  isVR: boolean;
  isHD: boolean;
  isUHD: boolean;
  landingUrl: Url;
  landingName: string;
  landingThumbUrl: Url;
  resolution?: Resolution;
}

// ─── Comments ────────────────────────────────────────────────────────────────

export interface LabeledIcon {
  name: string;
  icon: string;
  label: string;
}

export interface CommentAuthor {
  id: number;
  pageUrl: Url;
  isRetired: boolean;
  isVerified: boolean;
  name: string;
  thumbUrl: Nullable<Url>;
  isOnline: boolean;
  personalInfo: {
    gender: Nullable<LabeledIcon>;
    orientation: Nullable<LabeledIcon>;
    geo: Nullable<{ countryCode: string; countryName: string }>;
    /** `YYYY-MM-DD`, `0000-00-00` when hidden. */
    birthday: Nullable<string>;
  };
  isVip: boolean;
  nftLevel: unknown;
  isCreator: boolean;
  isProducer: boolean;
  isInactive: boolean;
}

export interface Comment {
  id: string;
  userId: number;
  /** May contain HTML entities. */
  text: string;
  replyToId: Nullable<string>;
  created: UnixSeconds;
  likes: Nullable<number>;
  status: string;
  isLikedByOwner: boolean;
  author: CommentAuthor;
  replyToUserName: Nullable<string>;
  isReplyToUserInactive: boolean;
  isSpam: boolean;
  isEditable: boolean;
  isOwnerComment: boolean;
}

// ─── Player ──────────────────────────────────────────────────────────────────

export interface VideoSource {
  /** Obfuscated, decoded client-side. */
  url: string;
  fallback: string;
  quality: Quality;
  label: string;
  type: LooseString<'' | 'HD'>;
}

export interface HlsSource {
  url: string;
  fallback?: string;
}

export interface RetryPolicy {
  maxNumRetry: number;
  retryDelayMs: number;
  maxRetryDelayMs: number;
}

export interface LoadPolicy {
  default: {
    maxTimeToFirstByteMs: number;
    maxLoadTimeMs: number;
    timeoutRetry: RetryPolicy;
    errorRetry: RetryPolicy;
  };
}

export interface HlsConfig {
  libSrc: Url;
  maxBufferLength: number;
  maxBufferSize: number;
  maxMaxBufferLength: number;
  maxBufferHole: number;
  maxSeekHole: number;
  capLevelToPlayerSize: boolean;
  capLevelOnFPSDrop: boolean;
  abrBandWidthUpFactor: number;
  abrBandWidthUpFactors: number[];
  abrBandWidthFactor: number;
  abrBandWidthFactors: number[];
  manifestLoadPolicy: LoadPolicy;
  playlistLoadPolicy: LoadPolicy;
}

export interface SubtitleTrack {
  label: string;
  urls: { vtt: Url };
  lang: string;
  isOriginal: boolean;
}

export interface StatsAddFields {
  player: string;
  pageType: string;
  maxQuality: Quality;
  videoId: number;
  orientation: Orientation;
  language: string;
  proxy_type: string;
  prev_url: Url;
  watch_id: string;
  session_started_at: UnixSeconds;
  session_token: string;
  'int.video_duration': number;
  site: SiteKind;
  stats_id: number;
  stats_uid: string;
  client_language: string;
  ip_usage_type: string;
  experiments: Experiments;
  locale: string;
  url: Url;
  domain: string;
  useragent: string;
  ip: string;
  country: string;
  city: string;
  state_code: string;
  stats_tkn: string;
  is_sfw: boolean;
  http_code: number;
  isp: string;
  /** Stringified flags such as `str.isAuth`, `str.exp7037`. */
  [key: `str.${string}`]: string;
}

export interface PlayerAds {
  vastUrls: { url: Url; type: LooseString<'ts' | 'xhl'>; trackMetrics: boolean }[];
  preflight: boolean;
  skipAdjustment: number;
  mobileStyles: boolean;
  skipOffset: number;
  maxSkipOffset: number;
  maxDuration: number;
  abortServerTimeout: number;
  abortShownTimeout: number;
  trackGA: boolean;
  trackGACollect: string[];
  trackCollector: boolean;
  trackCollectorExtra: Record<string, Nullable<string | number | boolean>>;
  hlsConfig: Pick<HlsConfig, 'abrBandWidthUpFactor' | 'abrBandWidthFactor'>;
  blockCssClass: string;
  videoLinkDisable: boolean;
  footerContainerSelector: string;
  labelContainerSelector: string;
  labelContainerOrder: number;
  linkClickSkip: boolean;
  preloadVideo: boolean;
  preloadLive: boolean;
  tresholdTimer: number;
  country: { code: string; name: string };
  isXhlPreroll: boolean;
  isEuCountry: boolean;
  companionDefaultIcon: Url;
  companionTitle: string;
  isPrerollSkipAfterProgressEnabled: boolean;
  noDesktopDuration: string;
  prerollLayoutExpGroup: string;
  skipMlTweak: boolean;
  isFullscreenPrerollEnabled: boolean;
  isAdditionalTelemetryEnabled: boolean;
  isProgressBarClickable: boolean;
  swapCompanionTitleAndCtaBrandname: boolean;
}

// ─── Video entities ──────────────────────────────────────────────────────────

export interface Pornstar {
  id: number;
  name: string;
  nameI18n: unknown;
  nameNormalized: string;
  enabled: Bit;
  parentId: number;
  moderated: Bit;
  country: string;
  bdate: string;
  profession: string;
  alias: string;
  aliases: unknown;
  inurl: string;
  orientation: number;
  type2: number;
  gender: string;
  uid: unknown;
  thumb: Record<string, string>;
  meta: {
    Score: string;
    isVerifiedCountry: boolean;
    fh: { studioId: number; studioVideos: number; studioDiscount: number; hasFhFanClub: boolean };
  };
  aliasOfId: Nullable<number>;
  hasFeatured: Bit;
  extractable: boolean;
  type: string;
  celebritytube: Bit;
  freeones: Bit;
  mrskin: Bit;
  tubepornstars: Bit;
  xvideos: Bit;
  iafd: Bit;
  csv: Bit;
  /** JSON-encoded external profile links. */
  href: string;
  weight: number;
  created: UnixSeconds;
  updated: UnixSeconds;
}

export interface VideoAuthor {
  modelName: string;
  id: number;
  pageURL: Url;
  retired: boolean;
  verified: boolean;
  name: string;
  isInactive: boolean;
  isPublicProfile: boolean;
}

export interface LangOption {
  value: string;
  label: string;
  url: Url;
  hreflang: string;
  shortLabel?: string;
}

export interface OrientationLink {
  title: string;
  orientation: Orientation;
  href: Url;
  data: string;
}

// ─── Root ────────────────────────────────────────────────────────────────────

/** Hydration state (`window.initials`) of an xHamster desktop video page. */
export interface xInitials {
  pageHiddenLink: Url;
  bannerBottom: AdBanner;
  ratingComponent: { ratingModel: RatingModel; likedPageUrl: Url };
  bannerUnderComments: {
    fh: { dataUrl: Url; dataUrlFallback: Url; statUrls: Url[]; fhOutTemplate: Url };
    statistics: TsImpressionStats;
  };
  xhlMlSource: {
    payload: {
      recommendEnabled: boolean;
      statsUid: string;
      views: number[];
      locationCountry: string;
      locationRegion: string;
      orientation: Orientation;
      clientLanguage: string;
      country: string;
      pageType: string;
      pageId: number;
      limit: number;
      experiments: Experiments;
      site: SiteKind;
      userExtra: { favoriteTags: number[] };
    };
    reqId: string;
  };
  videoTagsComponent: {
    isDesktop: boolean;
    subscriptionModel: SubscriptionModel;
    orientation: Orientation;
    isBot: boolean;
    isAmp: boolean;
    videoId: number;
    tags: Tag[];
    awardsParticipantUrl: Url;
    isSuggestButtonShown: boolean;
    excludedTagIds: `${number}`[];
  };
  relatedVideosComponent: {
    videoId: number;
    videoTabInitialData: {
      videoListProps: {
        videoThumbProps: VideoThumb[];
        dropdownType: string;
        additionalItems: ThumbWidgetItem[];
        isBigThumbs: boolean;
        userCountry: string;
        attrs: { 'data-role': string };
      };
      showAllLink: Url;
      nextRelatedPageCountMap: Record<string, number>;
      maxPages: number;
      isBigThumbs: boolean;
    };
    statistics: {
      pageType: string;
      pageId: number;
      uniqueImpressions: boolean;
      statistics: {
        relatedStatisticsEnabled: boolean;
        isRelatedSourceMl: boolean;
        mlRelatedSnapshotId: string;
        mlRelatedMode: string;
      };
      performance: { enabled: boolean };
      videoModel: { id: number };
    };
    ecommerceListId: string;
    relatedTabs: {
      id: Nullable<number>;
      name: Nullable<string>;
      counter: Nullable<number>;
      type: string;
    }[];
    pagingRequestData: {
      channelId: Nullable<number>;
      creatorId: Nullable<number>;
      newestMixinUsedCount: number;
      extDebug: unknown;
      extTestVersion: unknown;
      isUniversalShown: boolean;
      viewIdForce: string;
      fhVideoParams: {
        authorUsername: string;
        authorId: number;
        authorHasTrafficPowerUp: boolean;
        authorHasSponsorCSWidget: boolean;
      };
      xhlVideoParams: {
        isShownForCamsCategory: boolean;
        videoCategory: Nullable<string>;
        stripChatCountry: string;
      };
      fhBaseOffset: number;
    };
  };
  commentsComponent: {
    commentsList: {
      target: {
        type: string;
        id: number;
        publisher: Pick<CommentAuthor, 'id' | 'pageUrl' | 'isRetired' | 'name' | 'nftLevel'> & {
          thumbUrl: Url;
        };
      };
      items: Comment[];
      counters: { total: number; spamTotal: number; pages: number };
      denyWriteComment: unknown;
      isDenyWriteCommentLoaded: boolean;
    };
    isEnabledTimeCodes: boolean;
    isCollapsibleView: boolean;
  };
  downloadDropdownComponent: {
    isDesktopSite: boolean;
    signupUrl: Url;
    loginUrl: Url;
    vrFormatList: unknown[];
    howToWatchVrUrl: Url;
    videoUserId: number;
    videoId: number;
    videoTitle: string;
    isVideoVr: boolean;
    sources: {
      mp4: Partial<Record<VideoHeight, Url>>;
      download: Partial<Record<VideoHeight, { link: Url; size: number }>>;
    };
    sponsorLinkUrl: Nullable<Url>;
    sponsorDomainName: Nullable<string>;
    fhDownloadButton: { url: Url; qualityLabel: Quality; isTrailer: boolean; domainName: string };
  };
  shareButton: { pageUrl: Url; contentType: string; contentId: number };
  favoritesDropdownComponent: { isDesktopSite: boolean; triggerLabel: string; videoId: number };
  experiment44: unknown;
  handyIntegrationPanelComponent: unknown;
  visitFavorite: boolean;
  videoModel: {
    id: number;
    idHashSlug: string;
    duration: number;
    title: string;
    titleLocalized: string;
    pageURL: Url;
    icon: Nullable<string>;
    spriteURL: Url;
    trailerURL: Url;
    rating: Pick<RatingModel, 'modelName' | 'value'>;
    isVR: boolean;
    isHD: boolean;
    isFHD: boolean;
    isUHD: boolean;
    created: UnixSeconds;
    modelName: string;
    thumbURL: Url;
    previewThumbURL: Url;
    views: number;
    comments: number;
    modified: number;
    orientation: number;
    secured: number;
    status: number;
    description: string;
    downloadFile: Url;
    spriteCount: number;
    channelModel: unknown;
    editable: boolean;
    author: VideoAuthor;
    landing: Landing;
    resolution: Resolution;
    sponsor: Bit;
  };
  videoEntity: {
    id: number;
    type: string;
    isVr: boolean;
    duration: number;
    title: string;
    titleLocalized: {
      value: string;
      source: string;
      status: Nullable<string>;
      language: string;
      langStatus: Nullable<string>;
      isMain: Nullable<boolean>;
    };
    description: string;
    views: number;
    dateAgo: string;
    commentsCount: number;
    isCommentsDisabled: boolean;
    orientation: Orientation;
    thumbs: Record<`${number}`, Url>;
    capturedFrames: { captureTime: number; imgFrameSrc: Url }[];
    thumbBig: Url;
    rating: RatingModel;
    isDownloadable: boolean;
    isGeoBlocked: boolean;
    maxResolution: Quality;
    idHashSlug: string;
    contentType: string;
    slug: Nullable<string>;
    authorId: number;
    pornstarModels: Pornstar[];
  };
  videoSponsor: {
    title: string;
    buttonText: string;
    buttonBackgroundUrl: Url;
    bannerWidth: number;
    bannerHeight: number;
    bannerUrl: Nullable<Url>;
    message: string;
    linkUrl: Url;
    linkLabel: string;
    linkBadge: string;
    linkClass: string;
    isFh: boolean;
    isInCreatorVideoLinksExperiment: boolean;
    shouldShownLinksDialog: boolean;
    originalLinkUrl: Nullable<Url>;
    fhJoinUrl: Nullable<Url>;
    fhVideoCount: Nullable<number>;
    domainName: string;
    description: string;
    siteId: number;
    userType: string;
    hasAdShare: boolean;
    avatarUrl: Url;
    channelLogoUrl: Url;
    previewImageUrl: Url;
    linkTrack: unknown;
    ntvbBannerUrl: Nullable<Url>;
    ntvbBannerWidth: Nullable<number>;
    ntvbBannerHeight: Nullable<number>;
    ntvbLinkUrl: Url;
    tooltip: string;
    companyName: Nullable<string>;
  };
  xplayerSettings: {
    videoId: number;
    duration: number;
    debug: boolean;
    hasDSA: boolean;
    fallbackImageClass: string;
    preload: LooseString<'hls' | 'standard'>[];
    hlsConfig: HlsConfig;
    sources: {
      standard: { av1: VideoSource[]; h264: VideoSource[] };
      hls: { av1: HlsSource; h264: HlsSource };
    };
    inpEnabled: boolean;
    videoInfo: VideoInfo;
  };
  xplayerPluginSettings: {
    ads: PlayerAds;
    background: { top: boolean };
    banner: { bannerHtml: AdBanner; show: boolean };
    bannerBottom: {
      bannerUrl: Url;
      banner: string;
      /** Prerendered HTML. */
      html: string;
      title: string;
      siteId: string;
      userType: string;
      previewImageUrl: Url;
      channelLogoUrl: Url;
      avatarUrl: Url;
      showTimeout: number;
      fullWidth: boolean;
      enabled: boolean;
      tooltip: string;
    };
    context: { pageURL: Url };
    controlBar: { largeMode: unknown[] };
    hover: {
      link: {
        linkUrl: Url;
        className: string;
        badge: string;
        label: string;
        message: string;
        tooltip: string;
      };
    };
    poster: { url: Url };
    spriteLoader: {
      /** `printf`-style template with `%d`. */ template: Url;
      introDuration: number;
    };
    statistics: BoolFlags<
      | 'buffStats'
      | 'buffStats2'
      | 'adaptiveStats'
      | 'downloadSpeedStats'
      | 'errorStats'
      | 'uiStats'
      | 'xhWidgetsEventsStats'
    > & { addFields: StatsAddFields };
    chromecast: { sourceUrl: Url };
    subtitles: {
      tracks: SubtitleTrack[];
      siteCountryInfo: { lang: string };
      introDuration: number;
    };
    actionsData: { actions: unknown[]; introDuration: number };
    /** Normalized (0–1) watch intensity buckets across the timeline. */
    heatmap: { data: number[] };
    videoDescription: string;
    isRtl: boolean;
    relatedVideos: VideoInfo[];
  };
  /** Keys like `standard.h264.720p.prime`, `hls.av1`. */
  hostMap: Record<`${'standard' | 'hls'}.${string}`, string>;
  isInViewSuccessPercent: boolean;
  prerollAllowed: boolean;
  prerollConfig: { maxCount: number; stateConfig: number[] };
  isVr: boolean;
  vr: unknown;
  vrStats: boolean;
  watchId: string;
  language: string;
  existsSuggest: boolean;
  handyCredentials: unknown;
  playBackTimerProps: unknown;
  isNativePlayer: boolean;
  haveTransliteration: boolean;
  videoTitle: { pageTitle: string; titleTransliteration: string; views: number; rating: number };
  subscriptionComponent: {
    subscribeButtonsProps: {
      subscribeButtonProps: SubscriptionModel;
      outerButtonProps: { videosCount: number; discount: number; link: Nullable<Url> };
    };
    pmButtonsProps: {
      errorReceiveMessage: Nullable<string>;
      dialogProps: unknown;
      sendMessageLink: Url;
    };
    thumbUrl: Url;
    videos: number;
    name: string;
    link: Url;
    isDesktopSite: boolean;
    awardsParticipantUrl: Url;
  };
  videoHeadingComponent: { title: string; views: number; rating: number; isDesktopSite: boolean };
  aiNoticeComponent: unknown;
  gtmSettings: {
    dimensions: Record<string, string | number | boolean>;
    events: unknown[];
    overrides: { theme: { key: string; defaultValue: string } };
  };
  reportButtonComponent: {
    entityId: `${number}`;
    type: string;
    viewMode: string;
    tooltipText: string;
    classes: string;
  };
  videoCaptionsTranscription: {
    videoIdHashSlug: string;
    isDesktopSite: boolean;
    isBot: boolean;
    isAmp: boolean;
  };
  isServiceWorkerAllowed: boolean;
  isServiceWorkerForced: boolean;
  ampServiceWorkerInstallUrl: Url;
  langList: LangOption[];
  preferredLang: string;
  pk: string;
  stats_tkn: string;
  urls: Record<
    | 'cookiePolicy'
    | 'terms'
    | 'contactUsForm'
    | 'privacyPolicy'
    | 'dmcaPolicy'
    | 'videosRecommended'
    | 'videosSearch'
    | 'photosSearch'
    | 'channelsTop'
    | 'parentalcontrol'
    | 'trustAndSafety'
    | 'index'
    | 'hls'
    | 'tsLink'
    | 'camsWidgetMl'
    | 'uploadHost'
    | 'passwordRecovery'
    | 'signUpHeader'
    | 'signUp'
    | 'login'
    | 'signUpCreator'
    | 'googleOneTapIntermediate'
    | 'contactTranslate'
    | 'recommPromoSignup'
    | 'watchLater'
    | 'dating'
    | 'faq'
    | 'proxifiedStatsCollect',
    Url
  >;
  isHistoryNeedUserGesture: boolean;
  disableGalleries: boolean;
  isBackendWebpSupported: boolean;
  isBackendWebmSupported: boolean;
  bannerPrefix: string;
  sponsorBannerClass: string;
  sponsorLinkClass: string;
  sponsorBannerCompanionClass: string;
  uiStats: boolean;
  staticDomain: Url;
  recaptchaEnterpriseKeyV3: string;
  recaptchaKeyV2: string;
  ampGaUserStatus: number;
  userStatsParams: BoolFlags<'isCollected' | 'isForcedCooldown' | 'isBot'>;
  popunderCookieName: string;
  popunderFrequency: { minIntervalMinutes: number; windowMinutes: number; maxImpressions: number };
  requestId: string;
  divider: number;
  isDesktopSite: boolean;
  orientation: Orientation;
  isDesktop: boolean;
  promo: unknown;
  isDarkTheme: Nullable<boolean>;
  frontStats: boolean;
  frontStatsAdvanced: boolean;
  fidEnabled: boolean;
  notificationsModel: Record<
    'gifts' | 'messages' | 'friends' | 'notifications' | 'subscriptions',
    number
  >;
  layout: {
    isBare: boolean;
    layoutTopProps: {
      isBot: boolean;
      hasAgeProtect: boolean;
      enabledTracking: boolean;
      versionInfoProps: unknown;
    };
    layoutBottomProps: {
      isDesktopSite: boolean;
      hasPwaBanner: boolean;
      trackingPixel: string;
      metaBreadCrumbs: string;
      schema: unknown;
      partnersCounter: { server: string; counter: string; value: string; enabled: boolean };
      tsPrerollSettings: { url: Url; /** Percentage, 0–100. */ probability: number };
    };
    layoutPromoProps: {
      isDesktopSite: boolean;
      pmWrapperProps: {
        promoMessageInnerProps: {
          id: number;
          type: string;
          url: Url;
          pinned: boolean;
          title: string;
          abTestUrl: Url;
          btnText: string;
          captionText: string;
          colors: Record<
            | 'text'
            | 'button'
            | 'background'
            | 'buttonText'
            | 'captionText'
            | 'closeButton'
            | 'mobileButtonText',
            string
          > & {
            imageMobile: Url;
            imageDesktop: Url;
            imageMobileBig: Nullable<Url>;
            imageDesktopBig: Nullable<Url>;
          };
          company: string;
          isRtl: boolean;
          widgetOwner: string;
        };
      };
    };
    headerWrapperProps: {
      isDesktopSite: boolean;
      headerDesktopProps: {
        activeOrient: OrientationLink;
        allOrientations: OrientationLink[];
        isHideNotLegal: boolean;
        logoProps: {
          logo: {
            link: Url;
            title: string;
            lightSrc: Url;
            darkSrc: Url;
            alt: string;
            orientationHint: string;
            orientationClass: string;
          };
        };
        headerNavProps: {
          urls: Record<
            | 'preferredOrientationIndex'
            | 'mySubscriptions'
            | 'pornstarsIndex'
            | 'pornstarsCeleb'
            | 'pornstarsCountries'
            | 'pornstarsCreators'
            | 'pornstarsAwards'
            | 'creatorContest'
            | 'creatorVideos'
            | 'pornstarsCreatorOrien'
            | 'pornstarsCreatorCountries'
            | 'creatorSignup'
            | 'channelsPreferredOrientation'
            | 'photosPreferredOrientation'
            | 'myFavoritePhotos'
            | 'photoCategories'
            | 'premiumOut'
            | 'datingIndexPreferredOrientation'
            | 'reviewIndex'
            | 'myNews'
            | 'creatorIndex'
            | 'uploadIndexIndexNew'
            | 'photoUploadIndex'
            | 'storiesIndexManagePost'
            | 'myIntroductionEdit'
            | 'creatorSignupUploadHeader'
            | 'getForCategoriesPreferredOrientation'
            | 'fapHouseUpload'
            | 'lustyHeroes'
            | 'aiFriend',
            Url
          > & {
            aiJerkOff: Nullable<Url>;
            videoDropdownUrls: Record<
              | 'videosFilteredGay'
              | 'videosFilteredShemale'
              | 'videosFilteredStraight'
              | 'videosFilteredStraightVr'
              | 'categoriesPreferredOrientation'
              | 'myFavoriteVideos'
              | 'videosTopPreferredOrientation'
              | 'watchHistory'
              | 'watchLater'
              | 'momentsUrl',
              Url
            > & { myWatchLater: Nullable<Url> };
          };
          channelsList: {
            inurl: string;
            url: string;
            title: string;
            geo: string;
            href: Url;
            type: string;
            isBlurred: boolean;
          }[];
          recommendedCategories: {
            id: number;
            name: string;
            url: Url;
            geo: string;
            inurl: string;
            isBlurred: boolean;
            features: unknown;
          }[];
          isAuth: boolean;
          subscriptions: number;
          orientation: Orientation;
          isCreator: boolean;
          canUpload: boolean;
          isPhotoClosed: boolean;
          photoChannels: {
            dataStatisticName: string;
            link: Url;
            flagRight: unknown;
            title: string;
            isBlurred: boolean;
          }[];
          isPremiumEnabled: boolean;
          isReviewerUser: boolean;
          hasAdShare: boolean;
          isVr: boolean;
          activeNav: string;
          mainMenuWidget: { widgetTrackingUrl: Nullable<Url>; link: Url; label: string };
          hasPremiumSale: boolean;
          flirtifyMenuItem: { text: string; link: Url; icon: Url };
        };
        dmcaBannerProps: unknown;
        headerSearchProps: {
          limit: number;
          scope: string;
          searchQuery: string;
          scopeMembers: LooseString<'video' | 'moment' | 'photo' | 'user'>[];
          isPhotoClosed: boolean;
          orientation: Orientation;
        };
        langList: LangOption[];
        loginProps: { signUpHeaderUrl: Url };
        a11yNavUrls: Record<
          | 'index'
          | 'categories'
          | 'pornstars'
          | 'creators'
          | 'channels'
          | 'photos'
          | 'dating'
          | 'subscriptions'
          | 'news'
          | 'login'
          | 'signUp',
          Url
        > & { profile: Nullable<Url> };
      };
    };
    layoutBottomMobileProps: unknown;
    footerProps: {
      userInfo: Record<'isAmateur' | 'isProducer' | 'hasGft' | 'hasAdShare', Nullable<boolean>>;
      urls: Record<string, Nullable<Url>>;
      copyright: string;
      isDesktop: boolean;
      isTopDisabled: boolean;
      isOneLine: boolean;
      currentPage: string;
    };
    sidebarModalSheetProps: unknown;
  };
  fontFaceProps: { links: Record<'woff2' | 'woff' | 'ttf' | 'eot' | 'css', Url> };
  isTablet: boolean;
}

/** Frozen variant for consumers that must not mutate hydration state. */
export type xInitialsReadonly = DeepReadonly<xInitials>;

//#endregion
//#endregion

//#region Elements
declare global {
  interface HTMLElementTagNameMap {
    'count-frame': HTMLElement;
    'mu-js': HTMLElement;
    'mph-config': HTMLElement;
    /**
     * Made to "look like" a `HTMLAnchorElement`
     */
    'mph-a': HTMLElement;
    'mph-body': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mph-btn': HTMLElement;
    'mph-post': HTMLElement;
    'mph-tile': HTMLElement;
    'mph-viewer': HTMLElement;
    'mph-column': HTMLElement;
    'mph-elem': HTMLElement;
    'mph-empty': HTMLElement;
    'mph-header': HTMLElement;
    'mph-list': HTMLElement;
    'mph-main': HTMLElement;
    'mph-mainframe': HTMLElement;
    'mph-root': HTMLElement;
    'mph-row': HTMLElement;
    'mph-section': HTMLElement;
    'mph-toast': HTMLElement;
    'mph-toolbar': HTMLElement;
    'mph-url': HTMLElement;
    'tab-add': HTMLElement;
    'tab-close': HTMLElement;
    'tab-content': HTMLElement;
    'tab-host': HTMLElement;
    'tab-root': HTMLElement;
  }

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

/**
 * Groups members of an iterable according to the return value of the passed callback.
 * @param items An iterable.
 * @param keySelector A callback which will be invoked for each item in items.
 */
export declare function groupBy<K extends PropertyKey, T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K
): Partial<Record<K, T[]>>;

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
