import Link from "next/link";

export default function ConsumerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <Link
          href="/"
          className="mr-auto text-lg hover:underline px-2 flex items-center"
        >
          Benkyou Next
        </Link>
      </nav>
    </header>
  );
}
