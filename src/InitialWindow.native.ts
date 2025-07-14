import { NativeModules } from 'react-native';
import type { Metrics } from './SafeArea.types';

const { RNCSafeAreaContext } = NativeModules;

export const initialWindowMetrics = (RNCSafeAreaContext?.getConstants?.()
  ?.initialWindowMetrics ?? null) as Metrics | null;

/**
 * @deprecated
 */
export const initialWindowSafeAreaInsets = initialWindowMetrics?.insets;
