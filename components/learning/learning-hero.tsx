export function LearningHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Certifications &amp; Learning
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl">
          Ongoing Technical Growth
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
          A record of the courses and certifications I&apos;ve completed as I build depth across AI, machine
          learning, large language models, cloud, software engineering, and leadership — alongside the projects
          on this site.
        </p>
      </div>
    </section>
  );
}
