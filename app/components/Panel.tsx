import type { ReactNode } from "react";

export default function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[20px] border border-[#e3e8ef] bg-white p-5 shadow-[0_14px_40px_rgba(29,29,35,0.04)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="rounded-full bg-[#fef2f8] px-3 py-1.5 text-sm font-medium text-[#e8007b]">
          {action}
        </button>
      </div>
      {children}
    </section>
  );
}
