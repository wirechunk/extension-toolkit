import { createContext } from 'react';
import type { ContextData } from '@wirechunk/schemas/context-data/context-data';

const noop = () => {};

export type AnalyticsContext = {
  track: (
    event: string,
    properties?: Record<string, unknown> | null,
    sendImmediately?: boolean,
  ) => void;
  reset: () => void;
};

/**
 * An object with a general way to track analytics events.
 */
export const AnalyticsContext = createContext<AnalyticsContext>({
  track: noop,
  reset: noop,
});

export type CurrentUser = {
  __typename: 'User';
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  productItems: string[];
  orgId?: string | null;
};

export type CurrentUserContext = {
  user: CurrentUser | null;
  loading: boolean;
};

/**
 * The current user.
 */
export const CurrentUserContext = createContext<CurrentUserContext>({
  user: null,
  loading: false,
});

export type SiteContext = {
  id: string;
  platformId: string;
  name: string;
  domain: string;
  logoUrl?: string | null;
};

/**
 * The current site.
 */
// @ts-expect-error -- Wirechunk always provides a SiteContext at the root.
export const SiteContext = createContext<SiteContext>(null);

/**
 * The custom props provided at the page level or anywhere along the component tree.
 */
export const PropsContext = createContext<ContextData>({});

export type ToastContext = {
  toastError: (message: string, heading?: string) => void;
  toastSuccess: (message: string, heading?: string) => void;
  toastWarn: (message: string, heading?: string) => void;
};

/**
 * A context for displaying toasts.
 */
export const ToastContext = createContext<ToastContext>({
  toastError: noop,
  toastSuccess: noop,
  toastWarn: noop,
});
