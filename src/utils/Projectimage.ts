// Every image inside src/assets/projects/ is registered here at build time,
// so in projects.ts you can just write the file name.
const assetImages = import.meta.glob<string>('../assets/projects/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/**
 * Turns the `image` value written in data/projects.ts into a URL the browser can load.
 *
 *  - 'psyche.png'            -> file at src/assets/projects/psyche.png
 *  - '/projects/psyche.png'  -> file at public/projects/psyche.png
 *  - 'https://...'           -> external image, used as is
 */
export function resolveProjectImage(path?: string): string | undefined {
  if (!path) return undefined;

  // public/ folder paths and full URLs are used exactly as written
  if (path.startsWith('/') || /^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  // anything else is treated as a file inside src/assets/projects/
  const fileName = path.split('/').pop() ?? path;
  const url = assetImages[`../assets/projects/${fileName}`];

  if (!url) {
    console.warn(`[projects] Image not found: src/assets/projects/${fileName}`);
  }
  return url;
}