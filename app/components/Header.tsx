"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU = [
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
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
    className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
      ${show ? 'translate-y-0 bg-[#AF3E3E]/90 backdrop-blur-md shadow-xl' : '-translate-y-full'}
    `}
  >
    <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <div className="font-extrabold text-2xl tracking-tight text-[#EAEBD0]">Suitmedia</div>
      <ul className="flex gap-8">
        {MENU.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`px-3 py-2 rounded-lg transition-colors duration-200 text-base
                ${pathname === item.href
                  ? 'bg-[#CD5656] text-[#EAEBD0] font-bold shadow underline underline-offset-4'
                  : 'text-[#EAEBD0] hover:bg-[#DA6C6C] hover:text-[#EAEBD0]'}
              `}
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