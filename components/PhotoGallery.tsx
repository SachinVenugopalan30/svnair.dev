"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "@/lib/photos";

function useCountdown() {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const tomorrow = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1
        )
      );
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setRemaining(`${h}h ${m}m ${s}s`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return remaining;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const countdown = useCountdown();

  useEffect(() => {
    const timer = setTimeout(() => setCurtainOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const closeLightbox = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    if (selectedPhoto) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [selectedPhoto, closeLightbox]);

  return (
    <div className="relative">
      {/* Curtain animation */}
      <AnimatePresence>
        {!curtainOpen && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 left-0 z-40 w-1/2 bg-bg"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 z-40 w-1/2 bg-bg"
            />
          </>
        )}
      </AnimatePresence>

      {/* Masonry gallery */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.filename}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={curtainOpen ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 1.2 + i * 0.12,
              ease: "easeOut",
            }}
            className="mb-4 break-inside-avoid"
          >
            <img
              src={photo.url}
              alt={photo.filename}
              className="w-full cursor-pointer rounded-md shadow-sm transition-shadow duration-300 hover:shadow-lg"
              onClick={() => setSelectedPhoto(photo)}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Countdown */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={curtainOpen ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mt-10 text-center font-mono text-xs tracking-wider text-text-muted"
      >
        Next rotation in {countdown}
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-h-[90vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
