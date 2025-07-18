"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BANNER_HEIGHT = 400;
const BANNER_IMAGE = "/banner-image.jpg";

export default function Banner() {
  const [offset, setOffset] = useState(0);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // (Optional) Fetch banner image from API here...

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const scrollY = window.scrollY;
      setOffset(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax values
  const imageTranslate = offset * 0.18; // lebih lambat dari scroll
  const imageScale = 1 + Math.min(offset / 1200, 0.12); // sedikit zoom saat scroll
  const imageBlur = Math.min(offset / 100, 8); // blur saat scroll
  const textTranslate = offset * 0.45; // teks lebih cepat
  const textOpacity = Math.max(1 - offset / 350, 0.7); // sedikit fade

  return (
    <div
      ref={bannerRef}
      className="relative w-full overflow-hidden"
      style={{ height: BANNER_HEIGHT }}
    >
      {/* Gambar dengan parallax, scale, blur */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${imageTranslate}px) scale(${imageScale})`,
          filter: `blur(${imageBlur}px)`,
          transition: "transform 0.1s linear, filter 0.1s linear",
          zIndex: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        <Image
          src={bannerUrl || BANNER_IMAGE}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>
      {/* Teks dengan parallax lebih cepat, sedikit fade */}
      <div
        className="absolute left-1/2 top-1/2 z-10 text-white text-5xl font-extrabold drop-shadow-2xl select-none text-center"
        style={{
          transform: `translate(-50%, calc(-50% + ${textTranslate}px))`,
          opacity: textOpacity,
          transition: "transform 0.1s linear, opacity 0.1s linear",
        }}
      >
        Ideas That Inspire
      </div>
      {/* Spacer untuk tinggi banner */}
      <div style={{ height: BANNER_HEIGHT }} />
    </div>
  );
}