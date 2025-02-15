import { effect, signal } from 'maverick.js';
import { useReactContext } from 'maverick.js/react';
import { noop } from 'maverick.js/std';
import { useEffect, useMemo, useRef, useState } from 'react';
import { mediaContext, MediaState } from 'vidstack';

/**
 * This hook is used to access the current media state on the nearest parent media element (i.e.,
 * `<vds-media>`).
 *
 * @docs {@link https://vidstack.io/docs/react/player/core-concepts/state-management#reading}
 */
export function useMediaState(): Readonly<MediaState> {
  const [_, update] = useState(0),
    tracking = useRef({
      $props: signal<(keyof MediaState)[]>([]),
      observing: new Set<keyof MediaState>(),
    }),
    context = useReactContext(mediaContext);

  if (__DEV__ && !context) {
    throw Error('[vidstack] no media context was found - did you forget to provide it?');
  }

  useEffect(() => {
    return effect(() => {
      const props = tracking.current.$props();
      const $store = context!.$store;
      for (let i = 0; i < props.length; i++) $store[props[i]];
      update((n) => n + 1);
    });
  }, []);

  return useMemo(() => {
    const { observing, $props } = tracking.current,
      $store = context!.$store;

    return new Proxy($store, {
      get(_, prop: keyof MediaState) {
        if (!observing.has(prop)) {
          $props.set((prev) => [...prev, prop]);
          observing.add(prop);
        }

        return $store[prop];
      },
      // @ts-expect-error
      set: noop,
    });
  }, []);
}
