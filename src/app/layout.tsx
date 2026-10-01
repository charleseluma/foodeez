import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Foodeez — Experience food together",
  description: "Discover private dinners, tastings, chefs, and intentional food experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container nav-inner">
            <Link className="logo" href="/">foodeez<span className="logo-dot">.</span></Link>
            <nav className="nav-links" aria-label="Primary navigation">
              <Link href="/discover">Discover</Link>
              <Link href="/discover">Experiences</Link>
              <Link href="/chefs/andre-williams">Meet a Chef</Link>
              <Link href="/discover" className="btn btn-primary">Explore food</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            <div className="logo">foodeez<span className="logo-dot">.</span></div>
            <p style={{maxWidth:520,opacity:.75,marginTop:14}}>Food is better experienced together. Discover intentional culinary experiences and the people behind them.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}