import { Footer } from "@/src/components/modules/common/footer"
import { Navbar } from "@/src/components/modules/common/navbar"
import type React from "react"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
