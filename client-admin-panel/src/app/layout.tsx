import '../styles/globals.css';
import Link from 'next/link';
import LogoutButton from '../components/auth/LogoutButton';

export const metadata = { title: 'WEND Admin Panel' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold tracking-wide text-gray-900">
                WEND Admin
              </Link>
              <nav className="hidden sm:flex items-center gap-5">
                <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Projects
                </Link>
                <Link href="/portfolios" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Portfolios
                </Link>
                <Link href="/contacts" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Contacts
                </Link>
              </nav>
            </div>
            <LogoutButton />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}