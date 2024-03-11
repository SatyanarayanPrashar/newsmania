"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Navbar = () => {
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-white fixed top-0 flex items-center justify-between w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <div>NewsMania</div>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-[10vh]">
                <div>
                    <Link href="/">
                        Trending
                    </Link>
                </div>
                <div>
                    <Link href="/jobs">
                        Contact
                    </Link>
                </div>
                <div>Login</div>
            </div>
        </div>
    )
}