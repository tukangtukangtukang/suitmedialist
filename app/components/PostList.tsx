"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SortSelect from "./SortSelect";
import PerPageSelect from "./PerPageSelect";
import Pagination from "./Pagination";

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("-published_at");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    setPage(1); // Reset page ke 1 jika sort/perPage berubah
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
        // Cek meta.total, meta.last_page, atau meta.pageCount dari API
        const meta = data.meta || {};
        setTotalPages(meta.last_page || meta.totalPages || meta.pageCount || 10);
      } catch (e) {
        setPosts([]);
        setTotalPages(10);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [sort, perPage, page]);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SortSelect value={sort} onChange={setSort} />
        <PerPageSelect value={perPage} onChange={setPerPage} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : !posts.length ? (
        <div>No posts found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post: any) => {
              let imageUrl = post.medium_image || post.small_image;
              if (typeof imageUrl !== "string") imageUrl = undefined;
              const fullUrl = imageUrl
                ? imageUrl.startsWith("http")
                  ? imageUrl
                  : `https://suitmedia-backend.suitdev.com${imageUrl}`
                : "/anna-stampfli-pUCxfCJ3xEE-unsplash.jpg";
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
