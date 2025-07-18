"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SortSelect from "./SortSelect";
import PerPageSelect from "./PerPageSelect";
import Pagination from "./Pagination";
import SkeletonCard from "./SkeletonCard";

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("-published_at");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [sort, perPage]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`,
          {
            headers: { Accept: "application/json" },
          }
        );
        const data = await res.json();
        setPosts(data.data || []);
        const meta = data.meta || {};
        setTotalPages(meta.last_page || meta.totalPages || meta.pageCount || 10);
        setTotalItems(meta.total || 0);
      } catch (e) {
        setPosts([]);
        setTotalPages(10);
        setTotalItems(0);
      }
      // Tambahkan delay minimal 1 detik
      setTimeout(() => setLoading(false), 400);
    }
    fetchPosts();
  }, [sort, perPage, page]);

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalItems);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="text-[#AF3E3E] font-medium">
          {totalItems > 0 ? `Showing ${start}-${end} of ${totalItems}` : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <SortSelect value={sort} onChange={setSort} />
          <PerPageSelect value={perPage} onChange={setPerPage} />
        </div>
      </div>
      {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: perPage }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    ) : !posts.length ? (
      <div>No posts found.</div>
    ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post: any, idx: number) => {
              let imageUrl = post.medium_image || post.small_image;
              if (typeof imageUrl !== "string") imageUrl = undefined;
              let fallbackImage =
                idx % 2 === 0
                  ? "/card-image-even.jpg"
                  : "/card-image-odd.jpg";
              const fullUrl = imageUrl
                ? imageUrl.startsWith("http")
                  ? imageUrl
                  : `https://suitmedia-backend.suitdev.com${imageUrl}`
                : fallbackImage;
              return (
                <PostCard key={post.id} title={post.title} image={fullUrl} />
              );
            })}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}