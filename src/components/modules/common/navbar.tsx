import Link from "next/link"
import { Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ROUTES } from "@/lib/constants"
import { logoutUser } from "@/src/services/auth/logoutUser" 
import Image from "next/image"

interface NavbarProps {
  isAuthenticated?: boolean
  userRole?: string
}

export function Navbar({ isAuthenticated = false }: NavbarProps) {
  const baseLinks = [
    { href: ROUTES.HOME, label: "Home" },
    { href: ROUTES.EVENTS, label: "Events" },
  ]

  const authenticatedLinks = [
    { href: ROUTES.USER_DASHBOARD, label: "Dashboard" },
    { href: ROUTES.PROFILE, label: "Profile" },
  ]

  const links = isAuthenticated
    ? [...baseLinks, ...authenticatedLinks]
    : baseLinks

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 font-bold text-xl"
          >
           <Image src="/GhuraGhuri-ঘুরা-ঘুরি.png" alt="GhuraGhuri-ঘুরা-ঘুরি" width={150} height={150} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <form action={logoutUser}>
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-border hover:bg-muted bg-transparent"
                >
                  <Link href={ROUTES.LOGIN}>Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-linear-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Link href={ROUTES.REGISTER}>Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu (summary button only) */}
          <div className="md:hidden">
            <details className="group relative">
              <summary
                className="p-2 rounded-md hover:bg-muted transition-colors flex items-center cursor-pointer list-none"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 group-open:hidden" />
                <X className="h-6 w-6 hidden group-open:inline" />
              </summary>

              {/* Mobile Navigation Panel */}
              <div className="absolute right-0 mt-2 w-64 border border-border bg-card shadow-md rounded-lg py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                {/* Nav links */}
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-primary/10"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}

                {/* Auth section */}
                <div className="border-t border-border pt-4 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent border-border hover:bg-muted"
                        asChild
                      >
                        <Link href={ROUTES.PROFILE}>
                          <User className="h-4 w-4 mr-2" />
                          Account
                        </Link>
                      </Button>

                      <form action={logoutUser}>
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full justify-start bg-transparent border-border hover:bg-muted"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-border hover:bg-muted"
                        asChild
                      >
                        <Link href={ROUTES.LOGIN}>Sign In</Link>
                      </Button>
                      <Button
                        className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90"
                        asChild
                      >
                        <Link href={ROUTES.REGISTER}>Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  )
}
