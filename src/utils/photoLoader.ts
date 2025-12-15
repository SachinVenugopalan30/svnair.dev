import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export interface PhotoMetadata {
  filename: string;
  url: string;
}

const PHOTO_DIR = 'public/photography';
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export async function getAllPhotos(): Promise<PhotoMetadata[]> {
  try {
    const files = await readdir(PHOTO_DIR);

    return files
      .filter(file => VALID_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext)))
      .map(filename => ({
        filename,
        url: `/photography/${filename}`
      }));
  } catch (error) {
    console.warn('Photography folder not found, returning empty array');
    return [];
  }
}
