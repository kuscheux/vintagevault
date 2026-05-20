"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const announcements = [
  "Free shipping on orders over $500",
  "New arrivals added weekly \u2014 check back often",
  "Visit us at 680 N Hwy 29, Newnan, GA — across from the VFW",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground text-center py-2 px-8">
      <p className="text-xs sm:text-sm tracking-wide font-medium transition-opacity duration-300">
        {announcements[currentIndex]}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary-foreground/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
