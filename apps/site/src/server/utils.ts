import fs from 'fs';
import path from 'path';

export function readDirDeepSync(dir: string, exclude?: RegExp) {
  const files: string[] = [];

  for (const file of fs.readdirSync(dir)) {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      files.push(...readDirDeepSync(filePath, exclude));
    } else if (!exclude || !exclude.test(filePath)) {
      files.push(filePath);
    }
  }

  return files;
}
