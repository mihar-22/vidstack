<script lang="ts">
  import { kebabToPascalCase } from '@vidstack/foundation';
  import CodeFence from '../../../../@markdoc/@nodes/fence.svelte';

  import {
    code as jsRawCode,
    highlightedCode as jsHlsCode,
  } from './_imports/import-component.js?highlight';
  import {
    code as cdnRawCode,
    highlightedCode as cdnHlCode,
  } from './_imports/import-component.html?highlight';
  import {
    code as reactRawCode,
    highlightedCode as reactHlCode,
  } from './_imports/import-component.jsx?highlight';

  import { elementTagName } from '$src/stores/element';
  import { jsLib } from '$src/stores/js-lib';

  $: js = [jsRawCode, jsHlsCode].map((s) => s.replace('{TAG_NAME}', $elementTagName));
  $: cdn = [cdnRawCode, cdnHlCode].map((s) => s.replace('{TAG_NAME}', $elementTagName));
  $: react = [reactRawCode, reactHlCode].map((s) =>
    s.replace('TagName', kebabToPascalCase($elementTagName.replace('vds-', ''))),
  );

  const noImport = new Set(['vds-youtube', 'vds-vimeo']);
</script>

{#if noImport.has($elementTagName)}
  <p>This component is not available yet.</p>
{:else if $jsLib === 'react'}
  <CodeFence lang="jsx" code={react[0]} highlightedCode={react[1]} copy />
{:else}
  <CodeFence lang="js" code={js[0]} highlightedCode={js[1]} copy />
  <CodeFence lang="html" title="cdn" code={cdn[0]} highlightedCode={cdn[1]} copy />
{/if}
