export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

type AnalyticsProvider = (event: AnalyticsEvent) => void;

let provider: AnalyticsProvider | null = null;

export function setAnalyticsProvider(fn: AnalyticsProvider): void {
  provider = fn;
}

export function trackEvent(name: string, properties?: AnalyticsEvent['properties']): void {
  if (provider) {
    provider({ name, properties });
    return;
  }
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, properties);
  }
}
