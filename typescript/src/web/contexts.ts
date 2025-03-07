import { createContext } from 'react';
import type { MeFragment } from './queries/queries.generated';

const noop = () => {};

export type AnalyticsContext = {
  track: (
    event: string,
    properties?: Record<string, unknown> | null,
    sendImmediately?: boolean,
  ) => void;
  reset: () => void;
};

export const AnalyticsContext = createContext<AnalyticsContext>({
  track: noop,
  reset: noop,
});

export type CurrentUser = MeFragment;

type CurrentUserContext = {
  user: CurrentUser | null;
  loadingUser: boolean;
};

export const CurrentUserContext = createContext<CurrentUserContext>({
  user: null,
  loadingUser: false,
});

export type SiteContext = {
  id: string;
  platformId: string;
  name: string;
  domain: string;
  logoUrl?: string | null;
};

// @ts-expect-error -- Wirechunk always provides a SiteContext at the root.
export const SiteContext = createContext<SiteContext>(null);
