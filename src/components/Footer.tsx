import Link from 'next/link';
import { Calendar, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Eventify
              </span>
            </Link>
            <p className="text-gray-500 mb-6 max-w-sm">
              Discover, book, and create unforgettable experiences. Your ultimate platform for seamless event management and ticketing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/events" className="text-gray-500 hover:text-indigo-600 transition-colors">All Events</Link></li>
              <li><Link href="/categories/music" className="text-gray-500 hover:text-indigo-600 transition-colors">Music Concerts</Link></li>
              <li><Link href="/categories/tech" className="text-gray-500 hover:text-indigo-600 transition-colors">Tech Conferences</Link></li>
              <li><Link href="/categories/sports" className="text-gray-500 hover:text-indigo-600 transition-colors">Sports & Fitness</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Organizers</h3>
            <ul className="space-y-3">
              <li><Link href="/create" className="text-gray-500 hover:text-indigo-600 transition-colors">Create Event</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-indigo-600 transition-colors">Pricing</Link></li>
              <li><Link href="/resources" className="text-gray-500 hover:text-indigo-600 transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-indigo-600 transition-colors">Contact Sales</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
