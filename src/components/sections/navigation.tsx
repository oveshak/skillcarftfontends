"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Search,
  User,
  LogOut,
  Settings,
  WalletCards ,
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import logo from "../../../public/skillsCraftlogo.png";
import { isLoggedIn, logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card } from "../ui/container-scroll-animation";

/* ---------- (unchanged) NavItem & MobileNavItem components ---------- */

const NavItem = ({
  label,
  href,
  dropdown,
  dropdownItems,
  onDropdownToggle,
  isOpen,
}: {
  label: string;
  href: string;
  dropdown?: boolean;
  dropdownItems?: Array<{ label: string; href: string }>;
  onDropdownToggle?: (state: boolean) => void;
  isOpen?: boolean;
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => dropdown && onDropdownToggle?.(true)}
      onMouseLeave={() => dropdown && onDropdownToggle?.(false)}
    >
      {dropdown ? (
        <button className="flex items-center gap-0.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-300">
          <p className="mb-0 text-gray-700 font-semibold">{label}</p>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          <p className="mb-0 text-gray-700 font-semibold">{label}</p>
        </Link>
      )}

      {dropdown && dropdownItems && (
        <div
          className={`absolute top-full -left-8 mt-5 w-48 bg-background/95 backdrop-blur-md border border-gray-200 rounded-sm shadow-2xl z-50 transition-all duration-200 ease-out
          ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => onDropdownToggle?.(true)}
          onMouseLeave={() => onDropdownToggle?.(false)}
        >
          <div className="py-3 px-2">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-base text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({
  label,
  href,
  dropdown,
  dropdownItems,
  onClick,
  isOpen,
  onToggle,
}: {
  label: string;
  href: string;
  dropdown?: boolean;
  dropdownItems?: Array<{ label: string; href: string }>;
  onClick: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}) => {
  if (dropdown && dropdownItems) {
    return (
      <div className="border-b border-border/30">
        <button
          onClick={onToggle}
          className="flex items-center justify-between py-3 w-full text-lg font-medium text-gray-800 hover:text-primary transition-colors"
        >
          <span>{label}</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-3 pl-4">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={onClick}
                className="block py-2 text-base text-gray-700 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-3 text-lg font-medium text-gray-800 hover:text-primary border-b border-border/30 transition-colors"
    >
      <span>{label}</span>
    </Link>
  );
};

/* ---------- Helper: Outside click hook ---------- */
function useOutsideClose<T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);
  return ref;
}

const Navigation = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );
  const [selectedLanguage, setSelectedLanguage] = useState("BN");
  const [dropdownTimeout, setDropdownTimeout] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  // auth state
 const [loggedIn, setLoggedIn] = useState<boolean>(() => isLoggedIn());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useOutsideClose<HTMLDivElement>(userMenuOpen, () =>
    setUserMenuOpen(false)
  );
  const [userName, setUserName] = useState<string>("Account");

 

 useEffect(() => {
  const updateAuth = () => {
    const ok = isLoggedIn();
    setLoggedIn(ok);
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setUserName(u?.name || u?.username || "Account");
      } else {
        setUserName("Account");
      }
    } catch {
      setUserName("Account");
    }
  };

  updateAuth();

  // 🔔 same-tab instant update
  const onAuthChange = () => updateAuth();
  window.addEventListener("auth:changed", onAuthChange);

  // cross-tab changes
  const onStorage = () => updateAuth();
  window.addEventListener("storage", onStorage);

  // tab visible হলে রিফ্রেশ
  const onVis = () => { if (document.visibilityState === "visible") updateAuth(); };
  document.addEventListener("visibilitychange", onVis);

  return () => {
    window.removeEventListener("auth:changed", onAuthChange);
    window.removeEventListener("storage", onStorage);
    document.removeEventListener("visibilitychange", onVis);
  };
}, []);

  const handleLogout = () => {
    logoutUser(); // clears tokens & redirects to /login (as implemented earlier)
    setUserMenuOpen(false);
    setLoggedIn(false);
    router.refresh(); // ensure UI refresh
  };

  const userMenuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "My Courses", href: "/user/buycourse", icon: <BookOpen className="h-4 w-4" /> },
   
    
    { label: "My Order", href: "/user/order", icon: <WalletCards  className="h-4 w-4" /> },
    { label: "My Certificate", href: "/user/certificate", icon: <ShieldCheck   className="h-4 w-4" /> }, 
    { label: "My Result", href: "/user/result", icon: <ShieldCheck   className="h-4 w-4" /> }, 
    { label: "Profile", href: "/user/profile", icon: <User className="h-4 w-4" /> },
   
  ];

  const navItemsList = [
    // {
    //   label: "ক্লাস ৬-১২",
    //   href: "/academic/",
    //   dropdown: true,
    //   dropdownItems: [
    //     { label: "ক্লাস ৬", href: "/academic/class-6" },
    //     { label: "ক্লাস ৭", href: "/academic/class-7" },
    //     { label: "ক্লাস ৮", href: "/academic/class-8" },
    //     { label: "ক্লাস ৯-১০ (এসএসসি)", href: "/academic/class-9-10" },
    //     { label: "ক্লাস ১১-১২ (এইচএসসি)", href: "/academic/class-11-12" },
    //     { label: "পরীক্ষার প্রস্তুতি", href: "/academic/exam-prep" },
    //   ],
    // },
    // {
    //   label: "স্কিলস",
    //   href: "/skills/",
    //   dropdown: true,
    //   dropdownItems: [
    //     { label: "প্রোগ্রামিং", href: "/skills/programming" },
    //     { label: "ওয়েব ডিজাইন", href: "/skills/web-design" },
    //     { label: "গ্রাফিক্স ডিজাইন", href: "/skills/graphics-design" },
    //     { label: "ডিজিটাল মার্কেটিং", href: "/skills/digital-marketing" },
    //     { label: "ডেটা সাইন্স", href: "/skills/data-science" },
    //     { label: "ব্যবসা ও উদ্যোক্তা", href: "/skills/business" },
    //   ],
    // },
    {
      label: "All Course",
      href: "/categories/language-learning/",
    },
    // {
    //   label: "ভর্তি পরীক্ষা",
    //   href: "/admission",
    // },
    // {
    //   label: "আরো",
    //   href: "#",
    //   dropdown: true,
    //   dropdownItems: [
    //     { label: "জব প্রিপারেশন", href: "/job-preparation" },
    //     { label: "বই ও পিডিএফ", href: "/books-pdf" },
    //     { label: "লাইভ ক্লাস", href: "/live-classes" },
    //     { label: "ব্লগ", href: "/blog" },
    //     { label: "সাপোর্ট", href: "/support" },
    //   ],
    // },
  ];

  const handleDropdownToggle = (label: string, state: boolean) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }

    if (state) {
      setOpenDropdown(label);
    } else {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 150);
      setDropdownTimeout(timeout);
    }
  };

  const handleMobileDropdownToggle = (label: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === label ? null : label);
  };

  const handleSearch = (e: any) => {
    if (e && e.preventDefault) e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow bg-white font-bengali md:h-[65px]">
        <div className="mx-auto flex container items-center justify-between gap-3 px-4 py-0 ">
          <div className="flex items-center gap-2">
            <button
              className="xl:hidden text-gray-950"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">menu</span>
            </button>
            <div className="flex items-center gap-9">
              <Link href="/">
                <Image src={logo} alt="10ms" width={100} height={30} priority />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={
                  selectedLanguage === "BN"
                    ? "কোর্স বা টপিক খুঁজুন..."
                    : "Search courses or topics..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full px-4 py-2 pr-10 text-base text-gray-800  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          <nav className="mr-4 hidden xl:block">
            <ul className="flex items-center gap-2 lg:gap-4">
              {navItemsList.map((item) => (
                <li key={item.label} className="relative">
                  <NavItem
                    {...item}
                    onDropdownToggle={(state) =>
                      handleDropdownToggle(item.label, state)
                    }
                    isOpen={openDropdown === item.label}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* ====== RIGHT SIDE: Language + Phone + Auth ====== */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Language Selector */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("language")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="hidden text-gray-800 cursor-pointer items-center gap-1 rounded border border-gray-100 px-2 py-[2px] font-sans text-sm hover:bg-foreground/10 md:flex transition-colors duration-200">
                <span>{selectedLanguage === "BN" ? "বাং" : "EN"}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-300 ${
                    openDropdown === "language" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full -left-8 mt-5 w-32 bg-background border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-out ${
                  openDropdown === "language"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
                onMouseEnter={() => setOpenDropdown("language")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="py-2">
                  <button
                    onClick={() => {
                      setSelectedLanguage("BN");
                      setOpenDropdown(null);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-foreground/5 transition-colors ${
                      selectedLanguage === "BN"
                        ? "text-primary bg-primary/10"
                        : "text-gray-800"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("EN");
                      setOpenDropdown(null);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-foreground/5 transition-colors ${
                      selectedLanguage === "EN"
                        ? "text-primary bg-primary/10"
                        : "text-gray-800"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            <Link
              className="hidden items-center gap-1 text-primary md:flex hover:opacity-80 transition-opacity"
              href="tel:+8801926917452"
            >
              <Phone className="h-4 w-4" />
              {/* <span className="inline-block font-sans">16910</span> */}
            </Link>
            <Link
              className="flex items-center gap-1 text-primary md:hidden hover:opacity-80 transition-opacity"
              href="tel:16910"
              aria-label="Call 16910"
            >
              <Phone className="h-5 w-5" />
            </Link>

            {/* ===== Auth Area (Login button OR User Menu) ===== */}
            {!loggedIn ? (
              <Link
                href="/login/"
                className="flex items-center rounded-md bg-primary px-3 py-1 text-primary-foreground md:px-6 hover:bg-primary/90 transition-colors duration-200"
              >
                <span className="whitespace-nowrap text-[12px] font-semibold leading-[24px] md:text-base md:font-medium">
                  {selectedLanguage === "BN" ? "লগ-ইন" : "Login"}
                </span>
              </Link>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((s) => !s)}
                  className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 hover:bg-gray-50 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <span className="hidden md:block text-sm font-medium text-gray-800">
                    {userName}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 grid place-items-center overflow-hidden">
                    <User className="h-5 w-5 text-gray-700" />
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-700 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
                    userMenuOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                  role="menu"
                  aria-label="User menu"
                >
                  <div className="py-2">
                    {userMenuItems.map((itm) => (
                      <Link
                        key={itm.label}
                        href={itm.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                        role="menuitem"
                      >
                        {itm.icon}
                        <span>{itm.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>
                        {selectedLanguage === "BN" ? "লগআউট" : "Logout"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== Mobile Menu ===== */}
      <div
        className={`fixed inset-0 z-[100] xl:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div
          className={`relative z-10 flex h-full w-[300px] flex-col gap-6 border-r border-border bg-background p-6 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between">
            <Link href="" onClick={() => setMobileMenuOpen(false)}>
              <Image src={logo} alt="10ms logo" width={100} height={27} />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-black hover:opacity-80 transition-opacity"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  selectedLanguage === "BN"
                    ? "কোর্স বা টপিক খুঁজুন..."
                    : "Search courses or topics..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full px-4 py-2 pr-10 text-base text-gray-800 bg-background border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile nav items */}
          <nav className="flex flex-col">
            {navItemsList.map((item) => (
              <MobileNavItem
                key={item.label}
                {...item}
                onClick={() => setMobileMenuOpen(false)}
                isOpen={mobileOpenDropdown === item.label}
                onToggle={() => handleMobileDropdownToggle(item.label)}
              />
            ))}

            {/* Mobile auth row at bottom */}
            <div className="pt-4">
              {!loggedIn ? (
                <Link
                  href="/login/"
                  className="block w-full rounded-md bg-primary px-4 py-2 text-center text-white hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {selectedLanguage === "BN" ? "লগ-ইন" : "Login"}
                </Link>
              ) : (
                <div className="rounded-md border border-gray-200">
                  {userMenuItems.map((itm) => (
                    <Link
                      key={itm.label}
                      href={itm.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-50"
                    >
                      {itm.icon}
                      <span>{itm.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>
                      {selectedLanguage === "BN" ? "লগআউট" : "Logout"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
