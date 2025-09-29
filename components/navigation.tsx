"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Home, Settings, User, Plus } from "lucide-react"
import { motion } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Browse" },
    { href: "/matches", icon: Heart, label: "Matches" },
    { href: "/add-pet", icon: Plus, label: "Add Pet" },
    { href: "/preferences", icon: Settings, label: "Preferences" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900/80 border-t border-white/10 px-4 py-2 shadow-2xl"
    >
      <div className="flex justify-around max-w-sm mx-auto">
        {navItems.map(({ href, icon: Icon, label }, index) => {
          const isActive = pathname === href
          return (
            <motion.div
              key={href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={href}
                className="relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
}
