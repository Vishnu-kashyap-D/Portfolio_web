"use client";

import { Book, Menu, ShoppingCart, Search, Palette, GraduationCap, History, Users, LayoutDashboard, Sparkles, Boxes, Sun, Moon } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    mobileExtraLinks?: {
        name: string;
        url: string;
    }[];
    auth?: {
        login: {
            text: string;
            url: string;
        };
        signup: {
            text: string;
            url: string;
        };
    };
}

export default function Navbar({
    logo = {
        url: "/",
        src: "", // Removed external image to fallback to title
        alt: "Portfolio Logo",
        title: "Vishnu.AI",
    },
    menu = [
        { title: "Home", url: "/" },
        { title: "About", url: "#about" },
        { title: "Skills", url: "#skills" },
        { title: "Projects", url: "#projects" },
        { title: "Resume", url: "/RESUME.VK.pdf" },
    ],
    mobileExtraLinks = [
        { name: "LinkedIn", url: "#" },
        { name: "GitHub", url: "#" },
    ],
    auth = {
        login: { text: "Contact Me", url: "#contact" },
        signup: { text: "Download CV", url: "/RESUME.VK.pdf" },
    },
}: NavbarProps) {
    const [openSearch, setOpenSearch] = React.useState(false);
    const { setTheme, theme } = useTheme();

    return (
        <section className="py-4 fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-4">
                {/* Desktop Navbar */}
                <nav className="hidden justify-between lg:flex items-center">
                    <div className="flex items-center gap-6">
                        <Link href={logo.url} className="flex items-center gap-2 font-bold text-xl">
                            {logo.title}
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu className="[&_[data-radix-navigation-menu-viewport]]:rounded-3xl">
                                <NavigationMenuList className="rounded-3xl">
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setOpenSearch(true)}>
                            <Search className="size-4" />
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <a href={auth.login.url}>{auth.login.text}</a>
                        </Button>
                        <Button asChild size="sm">
                            <a href={auth.signup.url}>{auth.signup.text}</a>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navbar */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href={logo.url} className="flex items-center gap-2 font-bold text-lg">
                            {logo.title}
                        </Link>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setOpenSearch(true)}>
                                <Search className="size-4" />
                            </Button>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={logo.url} className="flex items-center gap-2">
                                                {logo.title}
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="my-6 flex flex-col gap-6">
                                        <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                                            {menu.map((item) => renderMobileMenuItem(item))}
                                        </Accordion>
                                        <div className="border-t border-gray-200 dark:border-gray-700 py-4">
                                            <div className="grid grid-cols-2 justify-start">
                                                {mobileExtraLinks.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                                                        href={link.url}
                                                    >
                                                        {link.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Button asChild variant="outline">
                                                <a href={auth.login.url}>{auth.login.text}</a>
                                            </Button>
                                            <Button asChild>
                                                <a href={auth.signup.url}>{auth.signup.text}</a>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Popup */}
            <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
                <CommandInput placeholder="Search projects, skills..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="text-gray-500" heading="Suggestions">
                        <CommandItem>Deep Learning</CommandItem>
                        <CommandItem>Computer Vision</CommandItem>
                        <CommandItem>Projects</CommandItem>
                        <CommandItem>Contact</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </section>
    );
}

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title} className="text-muted-foreground !rounded-3xl">
                <NavigationMenuTrigger className="!rounded-3xl">{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="!rounded-3xl">
                    <ul className="w-80 p-3">
                        <NavigationMenuLink className="!rounded-3xl">
                            {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                    <a
                                        className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                                        href={subItem.url}
                                    >
                                        {subItem.icon}
                                        <div>
                                            <div className="text-sm font-semibold">{subItem.title}</div>
                                            {subItem.description && (
                                                <p className="text-sm leading-snug text-muted-foreground">
                                                    {subItem.description}
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </NavigationMenuLink>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <a
            key={item.title}
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            {item.title}
        </a>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <Link
                            key={subItem.title}
                            className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                            href={subItem.url}
                        >
                            {subItem.icon}
                            <div>
                                <div className="text-sm font-semibold">{subItem.title}</div>
                                {subItem.description && (
                                    <p className="text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="font-semibold">
            {item.title}
        </a>
    );
};
