"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU = [
  { name: 'Home', href: '/' },
  { name: 'Ideas', href: '/ideas' },
  // Tambahkan menu lain jika perlu
];

export default function Header() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 10) {
            setShow(true);
          } else if (currentScrollY > lastScrollY) {
            setShow(false); // scroll down
          } else {
            setShow(true); // scroll up
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? 'translate-y-0 bg-white/80 backdrop-blur' : '-translate-y-full'
      } shadow`}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="font-bold text-lg">Suitmedia</div>
        <ul className="flex gap-6">
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-blue-600 font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
