import HelpNav from "../components/HelpNav";

// Typography lives here rather than on every heading in every article, so the
// four help pages stay pure content. Any element they render picks up the
// house styling automatically.
const prose = [
  "[&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-[0.02em] [&_h1]:text-army [&_h1]:uppercase lg:[&_h1]:text-5xl",
  "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-extrabold [&_h2]:text-army [&_h2]:uppercase lg:[&_h2]:mt-12 lg:[&_h2]:text-2xl",
  "[&_p]:mt-3 [&_p]:max-w-prose [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-army/80 lg:[&_p]:text-base",
  "[&_ul]:mt-4 [&_ul]:flex [&_ul]:max-w-prose [&_ul]:flex-col [&_ul]:gap-2.5",
  "[&_li]:border-l [&_li]:border-army/20 [&_li]:pl-4 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-army/80 lg:[&_li]:text-base",
  "[&_a]:underline [&_a]:underline-offset-4 [&_a]:transition hover:[&_a]:text-brass",
].join(" ");

export default function HelpLayout({ children }: LayoutProps<"/help">) {
  return (
    <section className="bg-cloud px-5 py-10 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
        <aside className="lg:border-r lg:border-dashed lg:border-army/20 lg:pr-8">
          <HelpNav />
        </aside>
        {/* min-w-0: without it this grid child refuses to shrink below the
            size-guide table's width and the whole page scrolls sideways. */}
        <article className={`min-w-0 ${prose}`}>{children}</article>
      </div>
    </section>
  );
}
