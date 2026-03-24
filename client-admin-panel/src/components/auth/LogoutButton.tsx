"use client";

import { usePathname, useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;