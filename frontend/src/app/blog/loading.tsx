export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-md mx-auto mb-4" />
      <div className="h-4 w-72 bg-muted rounded-md mx-auto mb-12" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-border overflow-hidden">
            <div className="aspect-video bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-4 w-[85%] bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
