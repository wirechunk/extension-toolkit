import { createContext } from 'react';

export type Dict = {
  [key: string]: unknown;
};

const noop = () => {};

export type AnalyticsContext = {
  track: (event: string, properties?: Dict | null, sendImmediately?: boolean) => void;
  reset: () => void;
};

export const AnalyticsContext = createContext<AnalyticsContext>({
  track: noop,
  reset: noop,
});
