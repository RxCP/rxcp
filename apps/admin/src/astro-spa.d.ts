declare module 'astro-spa' {
  export interface scrollIntoViewOptions {
    behavior?: 'smooth' | 'auto';
    block?: 'start' | 'center' | 'end' | 'nearest';
    inline?: 'start' | 'center' | 'end' | 'nearest';
  }
  export interface IntersectionObserverInit {
    root?: string;
    rootMargin?: string;
    threshold?: number | number[];
  }
  export interface progressBarOptions {
    height?: string;
    secondary?: boolean;
    colors?: {
      foreground?: string;
      background?: string;
    };
  }
  export interface analytics {
    trackingID: string;
    anonymizeIP?: boolean;
    colorDepth?: boolean;
    characterSet?: boolean;
    screenSize?: boolean;
    language?: boolean;
    fingerprinting?: boolean;
    trackingPeriod?: 'year' | 'month' | 'day';
  }
  export interface Props {
    analytics?: analytics;
    attributes?: Partial<HTMLScriptElement>;
    cache?: boolean;
    containerSelector?: string;
    defaultAnimation?: boolean;
    delay?: number;
    external?: boolean;
    forceRequestIdleCallback?: boolean;
    highPriorityPrefetch?: boolean;
    ignores?: string[];
    intersectionObserverOptions?: IntersectionObserverInit;
    limit?: number;
    localLinkDetector?: boolean;
    prefetch?: boolean;
    prefetchUpgradation?: boolean;
    progressBar?: boolean;
    progressBarOptions?: progressBarOptions;
    scanOnMount?: boolean;
    scrollIntoView?: boolean;
    scrollIntoViewOptions?: boolean | scrollIntoViewOptions;
    timeout?: number | false;
  }

  export function Spa(props: Props): void;
}
