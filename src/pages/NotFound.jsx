import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 text-primary">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary/50">
          KICKHOUSE
        </p>

        <h1 className="mt-4 text-8xl font-black tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>

        <p className="mt-3 text-sm leading-relaxed text-primary/60">
          Oops! The page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent hover:text-primary"
        >
          <Home size={17} />
          Go to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
