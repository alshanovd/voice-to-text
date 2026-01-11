"use client";
import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import { Bookmark, FileVolume, House, ScrollText } from "lucide-react";
import { usePin } from "@/hooks/use-pin";

export const Navbar = ({ envPin }: { envPin?: string }) => {
    const [pin] = usePin();
    const isAuth = pin === envPin;

    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="mt-5">
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="center"
            >
                <NavbarItem className="flex gap-10">
                    <Link href="/">
                        <House width="50px" height="50px" />
                    </Link>
                    {isAuth && (
                        <>
                            <Link href="/new-file">
                                <FileVolume width="50px" height="50px" />
                            </Link>
                            <Link href="/transcripts">
                                <ScrollText width="50px" height="50px" />
                            </Link>
                            <Link href="/bookmarks">
                                <Bookmark width="50px" height="50px" />
                            </Link>
                        </>
                    )}
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
