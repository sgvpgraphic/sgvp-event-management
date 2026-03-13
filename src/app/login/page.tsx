import Link from 'next/link';
import Image from 'next/image';
import { EyeOff } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white p-0 items-center justify-center">
      <div className="flex-1 w-full h-screen flex flex-col md:flex-row overflow-hidden rounded-none">
        
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-full md:w-[65%] bg-white relative overflow-hidden py-10 md:py-0 min-h-[260px] md:min-h-0">
          
          {/* Main Logo */}
          <div className="w-40 h-40 flex items-center justify-center relative z-10">
            <Image
              src="/images/event.jpg"
              alt="Event Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>

          {/* Building Background */}
          <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 md:h-72 lg:h-96 opacity-20 pointer-events-none flex items-end">
            <Image
              src="/images/building.png"
              alt="SGVP Building"
              fill
              className="object-contain object-bottom"
              sizes="100vw"
              priority
            />
          </div>

          {/* Bottom Logo */}
          <div className="absolute bottom-6 flex flex-col items-center z-10">
            <Image
              src="/images/logo.png"
              alt="SGVP Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

        </div>

        {/* Right Side */}
        <div className="w-full md:w-[35%] bg-[#fafafa] flex flex-col items-center justify-center p-8 md:border-l border-gray-100">
          <div className="w-full max-w-[280px]">
            <div className="text-center mb-8">
              <p className="text-[9px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">|| Jay Swaminarayan ||</p>
              <h2 className="text-[22px] font-normal text-[#d41c4a]">SGVP Event Diary</h2>
            </div>

            <form action="/dashboard" method="GET" className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] text-sm focus:ring-2 focus:ring-[#d41c4a] focus:outline-none placeholder-gray-400 text-gray-700"
                />
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] text-sm focus:ring-2 focus:ring-[#d41c4a] focus:outline-none placeholder-gray-400 text-gray-700"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-[140px] py-2.5 bg-[#d41c4a] hover:bg-[#b5143e] text-white rounded-lg font-medium shadow-md transition-all duration-200 text-sm active:scale-95"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
