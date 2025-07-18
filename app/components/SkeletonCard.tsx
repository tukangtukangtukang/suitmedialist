export default function SkeletonCard() {
    return (
      <div className="rounded-xl overflow-hidden shadow-lg bg-[#EAEBD0] border border-[#DA6C6C] flex flex-col animate-pulse">
        <div className="w-full aspect-[16/9] bg-[#DA6C6C]/30" />
        <div className="p-4 flex-1 flex flex-col">
          <div className="h-5 bg-[#DA6C6C]/40 rounded mb-2 w-3/4" />
          <div className="h-4 bg-[#DA6C6C]/30 rounded w-1/2" />
        </div>
      </div>
    );
  }