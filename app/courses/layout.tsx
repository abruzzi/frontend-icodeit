import { ui } from "@/lib/ui";

/**
 * Course routes break out of the global `max-w-4xl` main column so landings can use
 * wider hero, React Flow mindmaps, and roomier marketing layout.
 */
export default function CoursesLayout({
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
