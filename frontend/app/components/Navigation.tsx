"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, History, LogOut } from "lucide-react";
import { authUtils } from "@/lib/auth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TN</span>
            </div>
            <span className="text-xl font-bold text-white">TrueNumber</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Link>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={authUtils.logout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4 space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => {
                setIsMenuOpen(false);
                authUtils.logout();
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
