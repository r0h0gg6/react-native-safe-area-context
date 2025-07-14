import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import type {
  Edge,
  EdgeMode,
  EdgeRecord,
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
} from './SafeArea.types';
import { useMemo } from 'react';

const NativeSafeAreaView = requireNativeComponent<NativeSafeAreaViewProps>('RNCSafeAreaView');

const defaultEdges: Record<Edge, EdgeMode> = {
  top: 'additive',
  left: 'additive',
  bottom: 'additive',
  right: 'additive',
};

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, ...props }, ref) => {
  const nativeEdges = useMemo(() => {
    if (edges == null) {
      return defaultEdges;
    }

    const edgesObj = Array.isArray(edges)
      ? edges.reduce<EdgeRecord>((acc, edge: Edge) => {
          acc[edge] = 'additive';
          return acc;
        }, {})
      : // ts has trouble with refining readonly arrays.
        (edges as EdgeRecord);

    // make sure that we always pass all edges, required for fabric
    const requiredEdges: Record<Edge, EdgeMode> = {
      top: edgesObj.top ?? 'off',
      right: edgesObj.right ?? 'off',
      bottom: edgesObj.bottom ?? 'off',
      left: edgesObj.left ?? 'off',
    };

    return requiredEdges;
  }, [edges]);

  return <NativeSafeAreaView {...props} edges={nativeEdges} ref={ref} />;
});
