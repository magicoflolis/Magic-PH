import { PathLike } from 'node:fs';

type _PathLike = string | URL;

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

export declare function build(): Promise<void>;
