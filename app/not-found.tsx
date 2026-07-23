import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-2xl text-center">
        <h1 className="font-serif text-4xl tracking-[0.12em] sm:text-5xl">
          404 — Page not found
        </h1>
        <p className="mt-4 font-serif text-sm text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="inline-block py-2 font-serif text-xs tracking-[0.25em] underline-offset-4 hover:underline"
          >
            ← Back to the homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
