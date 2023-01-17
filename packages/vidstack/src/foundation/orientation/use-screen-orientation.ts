import { effect, peek, ReadSignal, signal } from 'maverick.js';
import { listenEvent } from 'maverick.js/std';

import { canOrientScreen } from '../../utils/support';
import { dispatchLockChange, dispatchOrientationChange } from './dispatch';
import type { ScreenOrientationEventTarget } from './events';
import type { ScreenOrientationLockType, ScreenOrientationType } from './screen-orientation';

const CAN_ORIENT_SCREEN = canOrientScreen();

export function useScreenOrientation(
  $target: ReadSignal<ScreenOrientationEventTarget | null>,
): UseScreenOrientation {
  const $orientation = signal<ScreenOrientationType | undefined>(getScreenOrientation()),
    $locked = signal(false);

  if (CAN_ORIENT_SCREEN) {
    effect(() => {
      const target = $target();
      if (!target) return;

      listenEvent(screen.orientation, 'change', (event) => {
        const orientation = getScreenOrientation()!;
        $orientation.set(orientation);
        dispatchOrientationChange(target, orientation, event);
      });

      return async () => {
        if (CAN_ORIENT_SCREEN && $locked()) await unlock();
      };
    });
  }

  async function lock(lockType) {
    assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    $locked.set(true);
    dispatchLockChange(peek($target), lockType);
  }

  async function unlock() {
    assertScreenOrientationAPI();
    await screen.orientation.unlock();
    $locked.set(false);
    const lockType = screen.orientation.type as ScreenOrientationLockType;
    dispatchLockChange(peek($target), lockType);
  }

  return {
    get orientation() {
      return $orientation();
    },
    get locked() {
      return $locked();
    },
    get supported() {
      return CAN_ORIENT_SCREEN;
    },
    lock,
    unlock,
  };
}

function assertScreenOrientationAPI() {
  if (!CAN_ORIENT_SCREEN) return;
  throw Error(
    __DEV__
      ? '[vidstack] screen orientation API is not available'
      : '[vidstack] no orientation API',
  );
}

function getScreenOrientation() {
  return __SERVER__ ? undefined : (window.screen?.orientation?.type as ScreenOrientationType);
}

export interface UseScreenOrientation {
  /**
   * The current screen orientation. It will return `undefined` if the Screen Orientation API
   * is not available.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  readonly orientation: ScreenOrientationType | undefined;
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  readonly locked: boolean;
  /**
   * Whether the native Screen Orientation API is available.
   */
  readonly supported: boolean;
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  lock(lockType: ScreenOrientationLockType): Promise<void>;
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  unlock(): Promise<void>;
}
