'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-row justify-between py-4 sm:py-2 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={`${s.logo} w-6 sm:w-4`} aria-label="Logo">
          <Logo />
        </Link>
        <button
          className="sm:hidden ml-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Dropdown menu for small screens */}
        <div
          className={`absolute top-full left-0 w-full bg-black sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <nav className="flex flex-col items-start py-4 space-y-1">
            <Link
              href="/"
              className={s.link}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {user && (
              <>
                <Link
                  href="/account"
                  className={s.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
                <Link
                  href="/dashboard"
                  className={s.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>
        </div>
        {/* Static menu for larger screens */}
        <nav className="ml-6 space-x-2 hidden lg:block sm:flex">
          <Link href="/" className={s.link}>
            Pricing
          </Link>
          {user && (
            <>
              <Link href="/account" className={s.link}>
                Account
              </Link>
              <Link href="/dashboard" className={s.link}>
                Dashboard
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
