import { effect, Signals } from 'maverick.js';
import type { CustomElementHost } from 'maverick.js/element';
import { createEvent, dispatchEvent, listenEvent } from 'maverick.js/std';

import { useMediaRemoteControl } from '../../media/remote-control';
import type {
  SliderDragEndEvent,
  SliderDragStartEvent,
  SliderDragValueChangeEvent,
  SliderValueChangeEvent,
} from './events';
import type { SliderStore } from './store';
import type { SliderElement, SliderProps } from './types';
import { getValueFromRate } from './utils';

/**
 * The direction to move the thumb, associated with key symbols.
 */
const SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: -1,
  ArrowUp: -1,
  Right: 1,
  ArrowRight: 1,
  Down: 1,
  ArrowDown: 1,
} as const;

export function useSliderEvents(
  host: CustomElementHost<SliderElement>,
  { $disabled, $step, $keyboardStep, $shiftKeyMultiplier }: Signals<SliderProps>,
  { onValueChange, onDragStart, onDragValueChange, onDragEnd }: SliderEventCallbacks,
  $store: SliderStore,
) {
  const remote = useMediaRemoteControl(host.$el);

  effect(() => {
    const target = host.$el();
    if (!target || $disabled()) return;
    listenEvent(target, 'pointerenter', onPointerEnter);
    listenEvent(target, 'pointermove', onPointerMove);
    listenEvent(target, 'pointerleave', onPointerLeave);
    listenEvent(target, 'pointerdown', onPointerDown);
    listenEvent(target, 'keydown', onKeyDown);
  });

  effect(() => {
    if ($disabled() || !$store.dragging) return;
    listenEvent(document, 'pointerup', onDocumentPointerUp);
    listenEvent(document, 'pointermove', onDocumentPointerMove);
    listenEvent(document, 'touchmove', onDocumentTouchMove, { passive: true });
  });

  function getValue(event: PointerEvent) {
    const thumbClientX = event.clientX;
    const { left: trackLeft, width: trackWidth } = host.el!.getBoundingClientRect();
    const thumbPositionRate = (thumbClientX - trackLeft) / trackWidth;
    return getValueFromRate($store.min, $store.max, thumbPositionRate, $step());
  }

  function updateValue(value: number, trigger?: Event) {
    $store.value = value;

    const event = createEvent(host.el, 'vds-slider-value-change', {
      detail: $store.value,
      trigger,
    });

    host.el?.dispatchEvent(event);
    onValueChange?.(event);
  }

  function updatePointerValue(value: number, trigger?: PointerEvent) {
    $store.pointerValue = value;

    dispatchEvent(host.el, 'vds-slider-pointer-value-change', {
      detail: value,
      trigger,
    });

    if ($store.dragging) {
      const event = createEvent(host.el, 'vds-slider-drag-value-change', {
        detail: value,
        trigger,
      });

      host.el?.dispatchEvent(event);
      onDragValueChange?.(event);
    }
  }

  function onPointerEnter() {
    $store.pointing = true;
  }

  function onPointerMove(event: PointerEvent) {
    if ($store.dragging) return;
    updatePointerValue(getValue(event), event);
  }

  function onPointerLeave(event: PointerEvent) {
    $store.pointing = false;
  }

  function onPointerDown(event: PointerEvent) {
    onStartDragging(event);
    updatePointerValue(getValue(event), event);
  }

  function onKeyDown(event: KeyboardEvent) {
    const { key, shiftKey } = event;
    const isValidKey = Object.keys(SliderKeyDirection).includes(key);
    if (!isValidKey) return;

    const modifiedStep = !shiftKey ? $keyboardStep() : $keyboardStep() * $shiftKeyMultiplier();

    const direction = Number(SliderKeyDirection[key]),
      diff = modifiedStep * direction,
      steps = ($store.value + diff) / $step();

    updateValue($step() * steps, event);
  }

  function onStartDragging(event: PointerEvent) {
    if ($store.dragging) return;
    $store.dragging = true;
    const value = getValue(event);
    updatePointerValue(value, event);
    remote.pauseUserIdle(event);
    const dragStartEvent = createEvent(host.el, 'vds-slider-drag-start', {
      detail: value,
      trigger: event,
    });
    host.el?.dispatchEvent(dragStartEvent);
    onDragStart?.(dragStartEvent);
  }

  function onStopDragging(event: PointerEvent) {
    if (!$store.dragging) return;
    $store.dragging = false;
    const value = getValue(event);
    updateValue(value, event);
    updatePointerValue(value, event);
    remote.resumeUserIdle(event);
    const dragEndEvent = createEvent(host.el, 'vds-slider-drag-start', {
      detail: value,
      trigger: event,
    });
    host.el?.dispatchEvent(dragEndEvent);
    onDragEnd?.(dragEndEvent);
  }

  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------

  function onDocumentPointerUp(event: PointerEvent) {
    onStopDragging(event);
  }

  function onDocumentTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  function onDocumentPointerMove(event: PointerEvent) {
    updatePointerValue(getValue(event), event);
  }
}

export interface SliderEventCallbacks {
  onValueChange?(event: SliderValueChangeEvent): void;
  onDragStart?(event: SliderDragStartEvent): void;
  onDragValueChange?(event: SliderDragValueChangeEvent): void;
  onDragEnd?(event: SliderDragEndEvent): void;
}
