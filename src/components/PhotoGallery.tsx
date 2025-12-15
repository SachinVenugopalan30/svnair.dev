import { useEffect, useState } from 'react';
import PhotoCard from './PhotoCard';
import CountdownTimer from './CountdownTimer';
import { seededShuffle, getDailySeed } from '../utils/seededShuffle';

interface PhotoMetadata {
  filename: string;
  url: string;
}

interface PhotoGalleryProps {
  allPhotos: PhotoMetadata[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ allPhotos }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoMetadata[]>([]);

  useEffect(() => {
    if (allPhotos.length > 0) {
      const seed = getDailySeed();
      const shuffled = seededShuffle(allPhotos, seed);
      const selected = shuffled.slice(0, 6);
      setSelectedPhotos(selected);
    }
  }, [allPhotos]);

  if (allPhotos.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-scarlet/20 to-ash-gray/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-text-secondary/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xl text-text-secondary">
            No photos available yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Countdown Timer */}
      <div className="flex justify-center">
        <CountdownTimer />
      </div>

      {/* Masonry grid using CSS columns */}
      <div className="masonry-grid">
        {selectedPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.filename}
            url={photo.url}
            filename={photo.filename}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
