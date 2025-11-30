"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ROUTES } from "@/lib/constants"

interface NavbarProps {
  isAuthenticated?: boolean
  userRole?: string
}

export function Navbar({ isAuthenticated = false, userRole = "user" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderNavLinks = () => {
    const baseLinks = [
      { href: ROUTES.HOME, label: "Home" },
      { href: ROUTES.EVENTS, label: "Events" },
    ]

    const authenticatedLinks = [
      { href: ROUTES.DASHBOARD, label: "Dashboard" },
      { href: ROUTES.PROFILE, label: "Profile" },
    ]

    const hostLinks = [{ href: ROUTES.CREATE_EVENT, label: "Create Event" }]
    const adminLinks = [{ href: ROUTES.ADMIN, label: "Admin" }]

    let links: { href: string; label: string }[] = [...baseLinks]

    if (isAuthenticated) {
      links = [...links, ...authenticatedLinks]
      if (userRole === "host" || userRole === "admin") {
        links = [...links, ...hostLinks]
      }
      if (userRole === "admin") {
        links = [...links, ...adminLinks]
      }
    }

    return links
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-sm">
              EA
            </div>
            <span className="hidden sm:inline bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Events & Activities
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {renderNavLinks().map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                  <Link href={ROUTES.PROFILE}>
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-muted bg-transparent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="border-border hover:bg-muted bg-transparent">
                  <Link href={ROUTES.LOGIN}>Sign In</Link>
                </Button>
                <Button size="sm" asChild className="bg-linear-to-r from-primary to-secondary hover:opacity-90">
                  <Link href={ROUTES.REGISTER}>Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {renderNavLinks().map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  {link.label}
                </Button>
              </Link>
            ))}
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
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-border hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full bg-transparent border-border hover:bg-muted" asChild>
                    <Link href={ROUTES.LOGIN}>Sign In</Link>
                  </Button>
                  <Button className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90" asChild>
                    <Link href={ROUTES.REGISTER}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
