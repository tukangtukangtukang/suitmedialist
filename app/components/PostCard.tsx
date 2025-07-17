"use client";
import Image from "next/image";

type PostCardProps = {
  title: string;
  image: string;
};

export default function PostCard({ title, image }: PostCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-white flex flex-col">
      <div className="relative w-full aspect-[16/9] bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg line-clamp-3">{title}</h3>
      </div>
    </div>
  );
}