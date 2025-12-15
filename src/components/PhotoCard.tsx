import { motion } from 'framer-motion';
import { useState } from 'react';

interface PhotoCardProps {
  url: string;
  filename: string;
  index: number;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ url, filename, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative overflow-hidden rounded-xl glass border border-white/10 group"
      style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-ash-gray/10 to-air-superiority-blue/10 animate-pulse" />
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={url}
          alt={`Photography ${filename}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-auto object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110`}
          style={{ display: 'block' }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="w-full aspect-square bg-gradient-to-br from-ash-gray/10 to-air-superiority-blue/10 flex items-center justify-center">
          <svg className="w-16 h-16 text-text-secondary/40" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-raisin-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default PhotoCard;
