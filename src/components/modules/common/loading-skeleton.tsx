export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border border-border p-4 space-y-3">
          <div className="h-6 bg-muted rounded-md w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded-md w-full animate-pulse" />
          <div className="h-4 bg-muted rounded-md w-5/6 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 bg-muted rounded-md flex-1 animate-pulse" />
            <div className="h-8 bg-muted rounded-md flex-1 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
