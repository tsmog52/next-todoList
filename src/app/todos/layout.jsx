'use client'

import { Inter } from "next/font/google";
import Link from "next/link";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const handleLogOut = () => {
    auth.signOut()
    router.push("/");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex pl-5 items-center py-4 overflow-x-auto whitespace-nowrap">
          <Link
            href="/todos"
            className="text-gray-600 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
            </svg>
          </Link>

          <span className="mx-5 text-gray-500 dark:text-gray-300">
            /
          </span>
          <button
            className="text-gray-600 dark:text-gray-200 hover:underline"
            onClick={handleLogOut}>
            ログアウト
          </button>

        </div>
          {children}
      </body>
    </html>
  );
}
