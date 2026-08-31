export function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Decorative background, consistent with the homepage's subtle grid/glow language */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
          My Blog
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl">
          Thoughts, Projects &amp; Things I Build
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
          A collection of project write-ups, technical notes, and things I&apos;m learning along the way —
          from computer vision experiments to the occasional lesson learned the hard way.
        </p>
      </div>
    </section>
  );
}
