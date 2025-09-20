"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, MenuIcon } from "./icons";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGO_URL } from "@/constants/app-constants";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contributors",
      href: "/contributors",
    },
    {
      label: "Sponsors",
      href: "/sponsors",
    },
  ];

  return (
    <header className="sticky top-0 z-10">
      <div className="relative flex w-full items-center justify-between px-6 pt-4">
        <div className="from-background absolute left-0 right-0 top-0 h-20 bg-gradient-to-b to-transparent" />

        <div className="relative z-10 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={DEFAULT_LOGO_URL}
              alt="OpenCut Logo"
              className="invert dark:invert-0"
              width={32}
              height={32}
            />
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="text" className="p-0 text-sm">
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 md:hidden">
            <Button
              variant="text"
              size="icon"
              className="flex items-center justify-center p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon size={30} />
            </Button>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/projects">
              <Button className="bg-background text-sm" variant="outline">
                <GithubIcon className="h-4 w-4" />
                30k+
              </Button>
            </Link>
            <Link href="/projects">
              <Button className="text-sm">
                Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div
          className={cn(
            "bg-background/20 pointer-events-none fixed inset-0 opacity-0 backdrop-blur-3xl",
            "transition-opacity duration-150",
            isMenuOpen && "pointer-events-auto opacity-100",
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative h-full">
            <nav className="flex flex-col gap-3 px-6 pt-[5rem]">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{
                    scale: isMenuOpen ? 1 : 0.98,
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isMenuOpen ? index * 0.1 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <ThemeToggle
              className="absolute bottom-8 right-8 size-10"
              iconClassName="!size-[1.2rem]"
              onToggle={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
