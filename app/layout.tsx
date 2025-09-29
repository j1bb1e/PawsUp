import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PawsUp - Old Bridge Animal Shelter",
  description:
    "Find your perfect furry companion from Old Bridge Animal Shelter in Old Bridge, New Jersey. Swipe through adoptable pets and find your match!",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="min-h-screen">{children}</div>
        <Navigation />
      </body>
    </html>
  )
}
