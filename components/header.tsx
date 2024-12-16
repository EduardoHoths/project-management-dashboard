"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function Header() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center p-4 bg-background">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/dashboard">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
        {session ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
      </div>
    </header>
  )
}

