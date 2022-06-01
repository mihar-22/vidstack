import { basename, dirname } from 'path';

/**
 * @param {string} filePath
 */
export function getComponentNameFromId(filePath) {
  // const baseTagName = basename(dirname(cleanFilePath(filePath)));
  const baseTagName = '';
  const tagName = `vds-${baseTagName}`;
  return {
    baseTagName,
    tagName,
  };
}
