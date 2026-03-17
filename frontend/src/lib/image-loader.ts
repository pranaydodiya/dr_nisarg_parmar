interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderParams): string {
  // Cloudinary images: use Cloudinary's own transformation API
  if (src.includes("res.cloudinary.com")) {
    // Insert /w_{width},q_{quality},f_auto/ before /upload/v...
    return src.replace(
      /\/upload\//,
      `/upload/w_${width},q_${quality || 75},f_auto/`
    );
  }

  // For all other remote images, return as-is (no Next.js optimization)
  return `${src}?w=${width}&q=${quality || 75}`;
}
