"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BANNER_HEIGHT = 400;

export default function Banner() {
  const [offset, setOffset] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const FALLBACK_IMAGE = "/anna-stampfli-pUCxfCJ3xEE-unsplash.jpg";
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const scrollY = window.scrollY;
      // Parallax: gambar lebih lambat, teks lebih cepat
      setOffset(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative w-full overflow-hidden"
      style={{ height: BANNER_HEIGHT }}
    >
      {/* Gambar dengan parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${offset * 0.3}px)`,
          transition: "transform 0.1s linear",
          zIndex: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        <Image
          src={bannerUrl || FALLBACK_IMAGE}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>
      {/* Teks dengan parallax lebih cepat */}
      <div
        className="absolute left-1/2 top-1/2 z-10 text-white text-5xl font-extrabold drop-shadow-2xl select-none text-center"
        style={{
          transform: `translate(-50%, calc(-50% + ${offset * 0.6}px))`,
          transition: "transform 0.1s linear",
        }}
      >
        Ideas That Inspire
      </div>
      {/* Spacer untuk tinggi banner */}
      <div style={{ height: BANNER_HEIGHT }} />
    </div>
  );
}
