export default function BlogPostLoading() {
  return (
    <article className="py-16 md:py-24 pb-20 animate-pulse">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="h-4 w-24 bg-muted rounded mb-6" />
        <div className="h-4 w-40 bg-muted rounded mb-4" />
        <div className="h-10 w-full max-w-2xl bg-muted rounded mb-8" />
        <div className="aspect-video bg-muted rounded-xl mb-8" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-[83%] bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
        </div>
      </div>
    </article>
  );
}
