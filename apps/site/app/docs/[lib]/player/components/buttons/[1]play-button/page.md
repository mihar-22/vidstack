---
description: This component is used to play and pause media.
---

## Usage

The `$tag:vds-play-button` component will toggle the `paused` state of media as it's pressed by
dispatching a `media-play-request`, and `media-pause-request` event to the media controller.

{% code_preview name="usage" copyHighlight=true highlight="html:3|react:6" /%}

## Styling

You can override the default styles with CSS like so:

```css
vds-play-button {
  color: pink;
  transition: opacity 0.2s ease-in;
}

/* Apply styles when media is paused. */
vds-play-button[paused] {
}

/* Apply styles when media is _not_ paused. */
vds-play-button:not([paused]) {
}

/* Style default icons. */
vds-play-button [slot='play'] {
}
vds-play-button [slot='pause'] {
}
```

## Custom Icons

Here's an example containing a custom play and pause icon:

{% code_snippet name="custom-icons" copyHighlight=true highlight="html:3-10|react:6-9" /%}
