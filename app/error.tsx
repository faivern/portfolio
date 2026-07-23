"use client"; // Error boundaries must be Client Components.

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-2xl text-center" role="alert">
        <h1 className="font-serif text-4xl tracking-[0.12em] sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 font-serif text-sm text-muted">
          An unexpected error occurred while rendering this page.
          {error.digest && ` Reference: ${error.digest}.`}
        </p>
        <p className="mt-8">
          <button
            type="button"
            onClick={reset}
            className="inline-block cursor-pointer border border-foreground/30 px-6 py-3 font-serif text-xs tracking-[0.25em] underline-offset-4 hover:border-foreground hover:underline"
          >
            Try again
          </button>
        </p>
      </div>
    </div>
  );
}
