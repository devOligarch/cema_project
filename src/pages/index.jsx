import { Geist } from "next/font/google"

import Header from "../../components/header"
import Application from "../../components/applications"

// Loading the Geist font
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main
      className={`${geistSans.className}  font-[family-name:var(--font-geist-sans)]`}
    >
      <Header />
      <Application />
    </main>
  )
}
