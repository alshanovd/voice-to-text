import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import { House, NotebookPen, ScrollText, Star } from "lucide-react";

export const Navbar = () => {
    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="mt-5">
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="center"
            >
                <NavbarItem className="flex gap-10">
                    <Link href="/">
                        <House width="75px" height="75px" />
                    </Link>
                    <Link href="/new-file">
                        <NotebookPen width="50px" height="50px" />
                    </Link>
                    <Link href="/history">
                        <ScrollText width="50px" height="50px" />
                    </Link>
                    <Link href="/">
                        <Star width="75px" height="75px" />
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
