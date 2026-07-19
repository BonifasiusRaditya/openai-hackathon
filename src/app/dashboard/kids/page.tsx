'use client';

import { useState } from 'react';
import { createStorybook } from '@/app/actions/storybook/storybook';
import Image from 'next/image';
import { Wand2, Trophy } from 'lucide-react';
import { useUser } from '@/app/hooks/useUser';
import { useBooks } from '@/app/hooks/useBooks';
import Link from 'next/link';

export default function KidsDashboard() {
  const { user } = useUser();
  const { books, isLoading: isLoadingBooks, refetch } = useBooks();
  const [tema, setTema] = useState('');
  const [selectedTemas, setSelectedTemas] = useState<string[]>([]);
  const [karakter, setKarakter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const isShowLatest = true;

  // Filter books based on search query
  const filteredBooks = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.theme?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema || !karakter) {
      alert('Please fill in both fields');
      return;
    }

    setIsGenerating(true);
    setProgressStatus('Starting storybook generation...');

    try {
      const result = await createStorybook(tema, karakter, user?.id, (status) => {
        setProgressStatus(status.message);
        setCurrentStep(status.step);
        setTotalSteps(status.totalSteps);
      });

      if (result.success && result.data) {
        setProgressStatus('Storybook generated successfully!');
      } else {
        setProgressStatus(`Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating storybook:', error);
      setProgressStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
      // Refetch books after generation is complete
      refetch();
    }
  };

  const handleTemaClick = (selectedTema: string) => {
    let newSelectedTemas: string[];

    if (selectedTemas.includes(selectedTema)) {
      // If already selected, deselect it
      newSelectedTemas = selectedTemas.filter((tema) => tema !== selectedTema);
    } else {
      // If not selected, add it (keeping max 2)
      if (selectedTemas.length >= 2) {
        // If already have 2, remove the first one and add the new one
        newSelectedTemas = [...selectedTemas.slice(1), selectedTema];
      } else {
        // Otherwise just add it
        newSelectedTemas = [...selectedTemas, selectedTema];
      }
    }

    setSelectedTemas(newSelectedTemas);
    setTema(newSelectedTemas.join(', '));
  };

  const handleKarakterClick = (selectedKarakter: string) => {
    setKarakter(selectedKarakter);
  };

  const isTemaSelected = (tema: string) => {
    return selectedTemas.includes(tema);
  };

  return (
    <>
      {/* Main Creation Box - Made more playful and engaging */}
      <div className="rounded-xl bg-gradient-to-b from-blue-50 to-white border-2 border-blue-100 shadow-lg relative">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 h-16 w-16 rounded-full bg-yellow-100 opacity-40"></div>
        <div className="absolute bottom-10 left-4 h-12 w-12 rounded-full bg-blue-100 opacity-40"></div>

        <div className="pt-4 px-4 pb-12 relative z-10">
          <h1 className="text-center text-xl font-bold text-blue-800 mb-6">Buat Cerita Petualanganmu! ✨</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Theme Selection - Styled with fun elements */}
            <div className="bg-white p-4 rounded-xl border-2 border-amber-200 shadow-md relative overflow-hidden">
              <div className="absolute -top-6 -right-6 h-12 w-12 bg-amber-100 rounded-full"></div>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h2 className="text-lg font-bold text-amber-800">Tema</h2>
              </div>

              <div className="mb-3">
                <input id="tema" type="text" value={tema} onChange={(e) => setTema(e.target.value)} className="w-full p-2 border-2 border-amber-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none" placeholder="Kerjasama, Empati, Peduli Lingkungan, Kreativitas" disabled={isGenerating} />
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => handleTemaClick('Kejujuran')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Kejujuran') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Kejujuran
                </button>
                <button type="button" onClick={() => handleTemaClick('Kerjasama')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Kerjasama') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Kerjasama
                </button>
                <button type="button" onClick={() => handleTemaClick('Empati')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Empati') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Empati
                </button>
                <button type="button" onClick={() => handleTemaClick('Disiplin')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Disiplin') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Disiplin
                </button>
                <button type="button" onClick={() => handleTemaClick('Pantang Menyerah')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Pantang Menyerah') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Pantang Menyerah
                </button>
                <button type="button" onClick={() => handleTemaClick('Berani Coba Hal Baru')} className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${isTemaSelected('Berani Coba Hal Baru') ? 'bg-amber-400 text-white shadow-md' : 'bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`} disabled={isGenerating}>
                  Berani Coba Hal Baru
                </button>
              </div>
            </div>

            {/* Character Selection - Styled with fun elements */}
            <div className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-md relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 h-12 w-12 bg-blue-100 rounded-full"></div>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h2 className="text-lg font-bold text-blue-800">Karakter</h2>
              </div>

              <div className="mb-3">
                <input id="karakter" type="text" value={karakter} onChange={(e) => setKarakter(e.target.value)} className="w-full p-2 border-2 border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none" placeholder="Isi deskripsi karakter..." disabled={isGenerating} />
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => handleKarakterClick('Dinosaurus berwarna hijau')} className="px-2 py-0.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:bg-blue-50 transition-all transform hover:scale-105" disabled={isGenerating}>
                  🦖 Dinosaurus berwarna hijau
                </button>
                <button type="button" onClick={() => handleKarakterClick('Bebek berwarna oranye')} className="px-2 py-0.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:bg-blue-50 transition-all transform hover:scale-105" disabled={isGenerating}>
                  🦆 Bebek berwarna oranye
                </button>
                <button type="button" onClick={() => handleKarakterClick('Kucing berwarna pink')} className="px-2 py-0.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:bg-blue-50 transition-all transform hover:scale-105" disabled={isGenerating}>
                  🐱 Kucing berwarna pink
                </button>
                <button type="button" onClick={() => handleKarakterClick('Kodok berwarna ungu')} className="px-2 py-0.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:bg-blue-50 transition-all transform hover:scale-105" disabled={isGenerating}>
                  🐸 Kodok berwarna ungu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button - Made more magical and playful */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-1/2 z-10">
          <button onClick={handleSubmit} className="bg-gradient-to-r from-amber-400 to-amber-500 text-white py-3 px-10 font-bold rounded-full text-lg hover:from-amber-500 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 shadow-lg border-2 border-amber-300 hover:border-amber-400 disabled:border-gray-200 transition-all transform hover:scale-105 flex items-center gap-2" disabled={isGenerating || !tema || !karakter}>
            <Wand2 size={20} />
            Generate New Book
          </button>
        </div>
      </div>

      {/* Progress bar section - kept the same functionality with improved styling */}
      {isGenerating && (
        <div className="mt-6 max-w-2xl mx-auto bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md w-2xl">
          <div className="bg-gray-100 rounded-full h-6 mb-4 overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <p className="text-gray-700 text-center font-medium">
            Step {currentStep} of {totalSteps}: {progressStatus}
          </p>
          <p className="text-red-500 text-center font-medium mt-2">*Do NOT refresh the page, it will interrupt the generation process!</p>
        </div>
      )}

      {/* Search box - Added more style */}
      <div className={isGenerating ? 'mt-0' : 'mt-6'}>
        <div className="relative">
          <input type="text" className="bg-white w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-300 focus:ring-2 focus:ring-amber-100 focus:outline-none transition-all shadow-sm" placeholder="Search your storybooks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Books grid - Same functionality with improved styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(isShowLatest ? 0 : 1).map((book) => (
            <Link href={`/dashboard/kids/storybook/${book.id}`} key={book.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 border-2 border-gray-100">
              <div className="relative pb-[66.67%]">
                <Image src={book.cover || 'https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png'} alt={book.title || 'Storybook cover'} fill className="object-cover" />
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
                <div className="flex items-center justify-between">
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
                  <span className="text-blue-500 text-xs font-medium flex items-center gap-1">
                    +2 EXP <Trophy size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : isLoadingBooks ? (
          // Loading state - kept same functionality
          Array.from({ length: 3 }).map((_, index) => (
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
          // No results from search - made more kid-friendly
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
          // Empty state - made more encouraging and kid-friendly
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border-2 border-blue-100 shadow-md">
            <div className="text-amber-500 mb-4 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M12 11h4" />
                <path d="M12 7h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Belum ada buku cerita</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">Ayo buat cerita pertamamu! Pilih tema dan karakter di atas dan buat petualangan seru bersama kami.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-gradient-to-r from-amber-400 to-amber-500 text-white py-2 px-6 font-bold rounded-full text-sm hover:from-amber-500 hover:to-amber-600 shadow-md flex items-center gap-2 transition-all transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              Buat Cerita Pertamamu
            </button>
          </div>
        )}
      </div>

      {/* Community section - Made more playful and engaging */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-xl shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

        <div className="flex items-center relative z-10">
          <div className="bg-blue-500 p-2 rounded-full mr-4 shadow-inner">
            <Image src="/book.svg" alt="Book icon" width={50} height={50} className="text-white translate-y-0.5" />
          </div>
          <h2 className="text-white text-xl font-bold">Temukan Cerita Baru dari Komunitas Lainnya!</h2>
        </div>

        <Link href="/dashboard/kids/community" className="bg-blue-500 hover:bg-blue-600 text-white pl-4 pr-3 py-2 rounded-full flex items-center gap-1 transition-all transform hover:scale-105 border border-blue-400 shadow-md">
          <p className="font-bold">Lihat Semua</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </>
  );
}
