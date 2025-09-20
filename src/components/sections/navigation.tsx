"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const NavItem = ({ label, href, dropdown }: { label: string; href: string; dropdown?: boolean }) => (
  <a
    href={href}
    className="flex cursor-pointer items-center gap-0.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
  >
    <p className="relative mb-0">{label}</p>
    {dropdown && <ChevronDown className="mt-px h-5 w-5" />}
  </a>
);

const MobileNavItem = ({ label, href, dropdown, onClick }: { label: string; href: string; dropdown?: boolean; onClick: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center justify-between py-3 text-lg font-medium text-foreground/80 hover:text-primary"
  >
    <span>{label}</span>
    {dropdown && <ChevronDown className="h-5 w-5" />}
  </a>
);

const Navigation = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemsList = [
    { label: 'ক্লাস ৬-১২', href: '/academic/', dropdown: true },
    { label: 'স্কিলস', href: '/skills/', dropdown: true },
    { label: 'ভাষা শিক্ষা', href: '/categories/language-learning/' },
    { label: 'ভর্তি পরীক্ষা', href: 'https://10minuteschool.com/admission' },
    { label: 'আরো', href: '#', dropdown: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background font-bengali text-foreground md:h-[65px]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-7">
          <div className="flex items-center gap-2">
            <button
              className="xl:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">menu</span>
            </button>
            <div className="flex items-center gap-9">
                 <a href="https://10minuteschool.com/">
                    <Image
                        src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                        alt="10ms"
                        width={100}
                        height={27}
                        style={{ filter: 'brightness(0) invert(1)' }}
                        priority
                    />
                </a>
            </div>
          </div>

          <nav className="mr-4 hidden xl:block">
            <ul className="flex items-center gap-2 lg:gap-4">
              {navItemsList.map((item) => (
                <li key={item.label} className='relative'>
                  <NavItem {...item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hidden cursor-pointer items-center gap-1 rounded border border-border px-2 py-[2px] font-sans text-sm hover:bg-foreground/10 md:flex">
                <span>EN</span>
            </button>
            
            <a className="hidden items-center gap-1 text-primary md:flex" href="tel:16910">
              <Phone className="h-4 w-4" />
              <span className="inline-block font-sans">16910</span>
            </a>

            <a className="flex items-center gap-1 text-foreground md:hidden" href="tel:16910" aria-label="Call 16910">
              <Phone className="h-5 w-5" />
            </a>

            <a
              href="https://10minuteschool.com/auth/login/"
              className="flex items-center rounded-md bg-primary px-3 py-1 text-primary-foreground md:px-6 hover:bg-primary/90"
            >
              <span className="whitespace-nowrap text-[12px] font-semibold leading-[24px] md:text-base md:font-medium">
                লগ-ইন
              </span>
            </a>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative z-10 flex h-full w-[300px] flex-col gap-6 border-r border-border bg-background p-6">
            <div className="flex items-start justify-between">
              <a href="https://10minuteschool.com/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                  alt="10ms logo"
                  width={100}
                  height={27}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col">
              {navItemsList.map((item) => (
                <MobileNavItem key={item.label} {...item} onClick={() => setMobileMenuOpen(false)} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;