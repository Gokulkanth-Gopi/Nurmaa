// Central image resolver for product images in Vite production and dev builds
const imageModules = import.meta.glob<string>(
  '/src/assets/images/Nurmaa product image/**/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
);

// Map different path variations to the bundled asset URL
const imageMap = new Map<string, string>();

for (const [path, url] of Object.entries(imageModules)) {
  // 1. Direct path from glob, e.g. "/src/assets/images/Nurmaa product image/granola.webp"
  imageMap.set(path, url);

  // 2. Without leading slash, e.g. "src/assets/images/Nurmaa product image/granola.webp"
  imageMap.set(path.replace(/^\//, ''), url);

  // 3. Lowercase versions for case-insensitive matching (important for Linux/Netlify)
  imageMap.set(path.toLowerCase(), url);
  imageMap.set(path.replace(/^\//, '').toLowerCase(), url);

  // 4. Filename only, e.g. "granola.webp"
  const filename = path.split('/').pop();
  if (filename) {
    imageMap.set(filename, url);
    imageMap.set(filename.toLowerCase(), url);
  }

  // 5. Encoded URI versions
  imageMap.set(encodeURI(path), url);
  imageMap.set(encodeURI(path).toLowerCase(), url);
}

/**
 * Resolves a product image path to the bundled URL produced by Vite.
 * Supports raw paths like '/src/assets/images/Nurmaa product image/granola.webp',
 * filenames like 'granola.webp', and case variations.
 */
export function resolveProductImage(imagePath?: string): string {
  if (!imagePath) return '/placeholder.svg';

  // If already resolved to a Vite bundled asset, http URL, or data URI
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:') ||
    imagePath.startsWith('/assets/') ||
    imagePath.startsWith('blob:')
  ) {
    return imagePath;
  }

  // Direct lookup
  if (imageMap.has(imagePath)) {
    return imageMap.get(imagePath)!;
  }

  // Normalized path with leading slash
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  if (imageMap.has(normalized)) {
    return imageMap.get(normalized)!;
  }

  // Lowercase lookup
  const lower = normalized.toLowerCase();
  if (imageMap.has(lower)) {
    return imageMap.get(lower)!;
  }

  // Filename lookup
  const filename = imagePath.split('/').pop();
  if (filename) {
    if (imageMap.has(filename)) return imageMap.get(filename)!;
    if (imageMap.has(filename.toLowerCase())) return imageMap.get(filename.toLowerCase())!;
  }

  return imagePath;
}

export default resolveProductImage;
