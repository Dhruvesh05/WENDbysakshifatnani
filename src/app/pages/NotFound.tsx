import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <h1 className="font-['Arimo:Regular',sans-serif] text-4xl text-[#072c3c] sm:text-5xl">Page not found</h1>
        <p className="mt-3 text-base text-[#4a5565]">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex rounded bg-[#072c3c] px-6 py-3 text-white transition hover:bg-[#0a3d52]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
