import { ui } from "@/lib/ui";

/**
 * Match course landings: wider column and marketing type scale so the hero and
 * sections feel consistent with /courses/frontend-system-design-essentials.
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <div
        className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 ${ui.courseShell}`}
      >
        {children}
      </div>
    </div>
  );
}
