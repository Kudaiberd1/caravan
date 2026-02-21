

import { useMemo } from "react";

type PaginationProps = {
  page: number; // 1-based
  size: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  size,
  totalPages,
  totalElements,
  onPageChange,
}: PaginationProps) {
  const rangeText = useMemo(() => {
    if (totalElements === 0) return "Показано 0 из 0 записей";
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, totalElements);
    return `Показано от ${start} до ${end} из ${totalElements} записей`;
  }, [page, size, totalElements]);

  const pages = useMemo(() => {
    const total = Math.max(1, totalPages);
    const current = Math.min(Math.max(1, page), total);

    let start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    start = Math.max(1, end - 4);

    const out: number[] = [];
    for (let p = start; p <= end; p++) out.push(p);
    return { out, current, total };
  }, [page, totalPages]);

  return (
    <div className={"flex items-center justify-between px-6 py-5"}>
      <p className={"text-xs text-gray-500"}>{rangeText}</p>

      <div className={"flex items-center gap-2"}>
        {/* Left arrow */}
        <button
          type="button"
          className={
            "h-9 w-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
          }
          disabled={pages.current <= 1}
          onClick={() => onPageChange(pages.current - 1)}
          aria-label="prev page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {pages.out.map((p) => {
          const active = p === pages.current;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={
                "h-9 w-9 rounded-full text-sm font-semibold transition " +
                (active ? "bg-[rgb(49,57,91)] text-white" : "bg-transparent text-gray-700 hover:bg-gray-100")
              }
            >
              {String(p).padStart(2, "0")}
            </button>
          );
        })}

        {/* Right arrow */}
        <button
          type="button"
          className={
            "h-9 w-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
          }
          disabled={pages.current >= pages.total}
          onClick={() => onPageChange(pages.current + 1)}
          aria-label="next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}