import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Menu, User, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-white border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src="/images/app-logo.jpg"
                  alt="Event Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-xl text-gray-800">
                Eventify
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Explore Events
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Create Event
            </Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <Link href="/login" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
