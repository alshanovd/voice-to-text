import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import { VVTIcon } from "./icons";

export const Navbar = () => {
    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="mt-5">
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="center"
            >
                <NavbarItem className="flex gap-10">
                    <Link href="/">
                        <VVTIcon width="75px" height="75px" />
                    </Link>
                    {/* <Link href="/history">
                        <HistoryIcon width="50px" height="50px" />
                    </Link> */}
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
