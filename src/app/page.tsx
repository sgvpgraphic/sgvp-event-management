import Link from 'next/link';
import { ArrowRight, Music, Monitor, Heart, Coffee, Star, MapPin, CalendarDays } from 'lucide-react';

export default function Home() {
  const featuredEvents = [
    {
      id: 1,
      title: "Global Tech Summit 2026",
      date: "Oct 15, 2026",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      price: "$299",
      category: "Tech"
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "Aug 20, 2026",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      price: "$150",
      category: "Music"
    },
    {
      id: 3,
      title: "Design Thinking Workshop",
      date: "Nov 05, 2026",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      price: "Free",
      category: "Art"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-x-0 top-0 h-96 overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600/5 mix-blend-multiply" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
            🎉 The #1 Event Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Discover Events That <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Match Your Passion</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Create, discover, and book amazing events happening around you. From technical conferences to local music festivals, we have it all.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/events" className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Explore Events
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
            <Link href="/create" className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-full text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors">
              Create an Event
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Events</h2>
              <p className="text-gray-500">Don't miss out on what's hot right now</p>
            </div>
            <Link href="/events" className="hidden sm:flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-56 w-full overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-sm">
                    {event.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-500 text-sm mb-6">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-indigo-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                      {event.location}
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-gray-50 hover:bg-indigo-50 text-indigo-600 font-medium rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Find exactly what you're looking for by browsing our curated categories.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Music', icon: Music, color: 'text-pink-500', bg: 'bg-pink-50' },
              { name: 'Technology', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50' },
              { name: 'Health', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
              { name: 'Food & Drink', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
            ].map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`} 
                className="flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className={`p-4 rounded-full ${category.bg} mb-4`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <span className="font-semibold text-gray-900">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
