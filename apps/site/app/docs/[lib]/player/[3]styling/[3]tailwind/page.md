---
title: Tailwind CSS
description: Introduction to using Vidstack Player with Tailwind.
---

# {% $frontmatter.title %}

In this section, we'll get you up and running with our Tailwind CSS plugin.

## Why?

If you're a fan of Tailwind CSS like we are, then you _really_ don't want to be forced to create
a `.css` file to handle random outlier cases. It not only slows you down and breaks your flow,
but it also goes against all the
[advantages of using utility classes](https://adamwathan.me/css-utility-classes-and-separation-of-concerns).

## Installation

You can register the plugin by adding the following to `tailwind.config.js`:

```js {% title="tailwind.config.js" copyHighlight=true highlight="2" %}
module.exports = {
  plugins: [require('vidstack/tailwind.cjs')],
};
```

## Usage

The `<vds-media>` element exposes media state as HTML attributes and CSS vars like so:

```html
<vds-media
  paused
  waiting
  seeking
  can-play
  ...
  style="--media-current-time: 500; --media-duration: 1000; ..."
>
  <!-- ... -->
</vds-media>
```

The tailwind plugin provides media variants which can be used to prefix utilities so they're
applied when a given media state is active.

{% code_snippet name="tw-good" /%}

## Media Variants

{% component this="../.tables/variants-table.md" /%}

## Media CSS Variables

You can take advantage of [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)
if you're using Tailwind CSS v3+ and use the following CSS media variables.

{% component this="../.tables/vars-table.md" /%}
