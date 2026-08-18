import { UserRole } from '@/generated/prisma/enums'
import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import logo from '@/app/favicon.ico'
import { Button } from '@/components/ui/button'
// import LogoutButton from '@/components/logout-button'
import { ModeToggle } from '@/components/mode-toggle'

export const Navbar = async ({ userRole }: { userRole?: { role?: UserRole } }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user

    return (
        <nav className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
            <div className="rounded-md border border-white/20 bg-white/10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-200 hover:bg-white/15 dark:border-white/10 dark:bg-black/10 dark:shadow-black/20 dark:hover:bg-black/15">
                <div className="flex items-center justify-between px-6 py-4">

                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="CodeFlow"
                            width={50}
                            height={50}
                            className="h-auto"
                        />
                        <span className="text-2xl font-bold tracking-widest text-gray-300">
                            CodeFlow
                        </span>
                    </Link>

                    <div className="flex items-center justify-center gap-x-4">
                        <Link
                            href="/problems"
                            className="text-sm font-medium text-zinc-600 hover:text-gray-600 dark:text-zinc-400 dark:hover:text-gray-400"
                        >
                            Problems
                        </Link>

                        <Link
                            href="/about"
                            className="text-sm font-medium text-zinc-600 hover:text-gray-600 dark:text-zinc-400 dark:hover:text-gray-400"
                        >
                            About
                        </Link>

                        {user && (
                            <Link
                                href="/profile"
                                className="text-sm font-medium text-zinc-600 hover:text-gray-600 dark:text-zinc-400 dark:hover:text-gray-400"
                            >
                                Profile
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                {userRole?.role === UserRole.ADMIN && (
                                    <Link href="/create-problem">
                                        <Button variant="outline">
                                            Create Problem
                                        </Button>
                                    </Link>
                                )}



                                <Link href="/profile">
                                    <Image
                                        src={user.image || "/default-avatar.png"}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="h-auto rounded-full"
                                    />
                                </Link>
                                <ModeToggle />

                                {/* <LogoutButton /> */}
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">
                                        Sign In
                                    </Button>
                                </Link>

                                <Link href="/login">
                                    <Button>
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}