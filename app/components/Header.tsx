"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
        ${show ? 'translate-y-0 bg-[#AF3E3E]/90 backdrop-blur-md shadow-xl' : '-translate-y-full'}
      `}
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="font-extrabold text-2xl tracking-tight text-[#EAEBD0]">Suitmedia</div>
        {/* Desktop menu */}
        <ul className="hidden sm:flex gap-0">
          {MENU.map((item, idx) => (
            <li
              key={item.href}
              className={idx < MENU.length - 1 ? "border-r border-[#DA6C6C]" : ""}
            >
              <Link
                href={item.href}
                className={`px-4 py-2 block rounded-none transition-colors duration-200 text-base
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
        {/* Hamburger icon */}
        <button
          className="sm:hidden text-[#EAEBD0] text-2xl"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileOpen(false)}>
          <ul
            className="absolute top-16 left-0 w-full bg-[#AF3E3E] flex flex-col items-center gap-0 py-8 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            {MENU.map((item, idx) => (
              <li
                key={item.href}
                className={idx < MENU.length - 1 ? "border-b border-[#DA6C6C] w-full" : "w-full"}
              >
                <Link
                  href={item.href}
                  className={`block px-6 py-3 w-full text-center transition-colors duration-200
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
        </div>
      )}
    </header>
  );
}