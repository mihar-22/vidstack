---
description: This component is used to load and display a preview video over a slider.
---

## Usage

The `$tag:vds-slider-video` component can be used to load a video in a slider.
This is _generally_ used to show a preview video (low-resolution) as the user interacts with the
time slider.

The point at which the user is hovering or dragging (`pointerValue`) is the preview time position.
The video will automatically be synced with said value, so ensure both the preview and loaded
video are of the same length (i.e., duration).

{% code_preview name="usage" copyHighlight=true highlight="html:4-7|react:7" /%}

## Video Attributes

The following video attributes are applied to the `vds-slider-video` element:

- `can-play`: Present when the video is ready for playback.
- `error`: Present when media loading fails.

```html
<vds-slider-video error />
```

You can use these attributes to further style the slider video as it's being loaded, such as hiding
it before media is ready or if it fails to load.

## Video Events

The native video `canplay` and `error` events are re-dispatched by this component for you to
listen to if needed.

{% code_snippet name="video-events" /%}

## Styling

You can override the default styles with CSS like so:

```css
/* Override default styles. */
vds-slider-video {
}

/* Apply styles to the underlying `<video>` element. */
vds-slider-video video {
  width: 156px;
}
```
