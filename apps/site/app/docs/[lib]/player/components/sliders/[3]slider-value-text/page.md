---
description: This component is used to display the current value of a slider in various formats such as a raw value, percentage, or time.
---

## Usage

The `$tag:vds-slider-value-text` component displays the current value of a parent slider, or the
value at the device pointer (e.g., the position at which the user is hovering their mouse over
the slider).

The value can be displayed as a:

- `value` (e.g., `70`),
- `percent`: uses the slider's current and max value (e.g., `70%`),
- `time`: uses the slider's current value, assuming seconds (e.g., value of `70` = `1:10`).

The `$tag:vds-slider-value-text` component can be combined with the `$tag:vds-time-slider` to
display the current time as the user hovers over the scrubber:

{% code_snippet name="time-slider" copyHighlight=true highlight="html:4-10|react:8" /%}

Or, with the `$tag:vds-volume-slider` component to display the current volume percentage:

{% code_snippet name="volume-slider" copyHighlight=true highlight="html:4|react:8" /%}
