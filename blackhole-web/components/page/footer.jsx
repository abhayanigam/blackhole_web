import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-5 backdrop-blur-3xl mt-8 px-6 md:px-20 lg:px-32">
      <div>
        <h1 className="text-xl font-bold">
          Black<span className="opacity-50">Hole</span>
        </h1>
        <p className="text-xs text-muted-foreground">
          Made with Nextjs by{" "}
          <a
            className="underline hover:text-primary"
            href="https://github.com/abhayanigam"
          >
            Abhaya Nigam
          </a>{" "}
          hosted on vercel.
        </p>
      </div>
      <p className="text-muted-foreground text-sm mt-2 max-w-lg">
        We don't own any of the songs and images it belongs to its respective
        owners, built for educational purposes.
      </p>
      <div className="flex gap-3 mt-3">
        <Link
          target="_blank"
          className="text-sm opacity-80 font-light underline hover:opacity-100"
          href="https://github.com/abhayanigam/blackhole_web"
        >
          Source Code
        </Link>
        <Link
          target="_blank"
          className="text-sm opacity-80 font-light underline hover:opacity-100"
          href="https://www.linkedin.com/in/abhaya-nigam"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
