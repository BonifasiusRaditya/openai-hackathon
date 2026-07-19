'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCommunityBooks } from '@/app/hooks/useCommunityBooks';
import Link from 'next/link';

export default function CommunityPage() {
  const { books, isLoading } = useCommunityBooks();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.theme?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Enhanced Header with gradient and decorative elements */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 flex justify-center items-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

        <div className="flex items-center relative z-10">
          <div className="bg-blue-500 p-1 rounded-full mr-6 shadow-inner">
            <Image src="/book.svg" alt="Book icon" width={70} height={70} className="text-white translate-y-0.5" />
          </div>
          <h2 className="text-white text-5xl font-bold">Community Library</h2>
        </div>
      </div>

      {/* Enhanced Search Box */}
      <div>
        <div className="relative">
          <input type="text" className="bg-white w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-300 focus:ring-2 focus:ring-amber-100 focus:outline-none transition-all shadow-sm" placeholder="Search community storybooks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link href={`/dashboard/kids/storybook/${book.id}`} key={book.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 border-2 border-gray-100">
              <div className="relative pb-[66.67%]">
                <Image src={book.cover} alt={book.title || 'Storybook cover'} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{book.title || 'Untitled Storybook'}</h3>
                <div className="flex flex-wrap gap-1 mb-1">
                  {book.theme?.split(',').map((theme, index) => (
                    <span key={index} className="bg-amber-100 text-amber-600 border-amber-300 border px-2 py-0.5 rounded-full text-xs font-medium">
                      {theme.trim().charAt(0).toUpperCase() + theme.trim().slice(1)}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs">
                  Created at{' '}
                  {new Date(book.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : isLoading ? (
          // Enhanced Loading state
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse border-2 border-gray-100">
              <div className="relative pb-[66.67%] bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="flex flex-wrap gap-1 mb-1">
                  <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full w-24 mt-2"></div>
              </div>
            </div>
          ))
        ) : searchQuery ? (
          // Enhanced No results from search - made more kid-friendly
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border-2 border-gray-100 shadow-md">
            <div className="text-amber-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Tidak ada hasil</h3>
            <p className="text-gray-600 text-center">Coba cari dengan kata kunci lain ya!</p>
          </div>
        ) : (
          // Enhanced Empty state - made more encouraging and kid-friendly
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border-2 border-blue-100 shadow-md">
            <div className="text-amber-500 mb-4 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M12 11h4" />
                <path d="M12 7h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Belum ada buku cerita</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">Belum ada storybook di perpustakaan komunitas. Buat dan bagikan petualanganmu!</p>
            <Link href="/dashboard/kids" className="bg-gradient-to-r from-amber-400 to-amber-500 text-white py-2 px-6 font-bold rounded-full text-sm hover:from-amber-500 hover:to-amber-600 shadow-md flex items-center gap-2 transition-all transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Back to Dashboard Button */}
      <div className="mt-8 flex justify-center">
        <Link href="/dashboard/kids" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 border border-blue-400 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <p className="font-bold">Kembali ke Dashboard</p>
        </Link>
      </div>
    </>
  );
}
