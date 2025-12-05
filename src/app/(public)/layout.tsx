import { Footer } from "@/src/components/modules/common/footer"
import { Navbar } from "@/src/components/modules/common/navbar"
import { getCookie } from "@/src/services/auth/tokenHandlers";
import type React from "react"

export default async function  PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const accessToken = await getCookie("accessToken");
  return (
    <>
      <Navbar isAuthenticated={!!accessToken} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
