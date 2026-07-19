import { Button } from '@/components/ui/button';
import { MacbookPro } from '@/components/ui/macbook-pro';
import { Book, Lightbulb, Video, Wand2, Stars, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
        {/* Header Section */}
        <section className="min-h-screen flex flex-col">
          {/* Hero Section with playful gradients and decorative elements */}
          <div className="flex-1 flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 py-12 bg-gradient-to-b from-blue-50 via-white to-amber-50 justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 h-24 w-24 rounded-full bg-yellow-100 opacity-40"></div>
            <div className="absolute top-40 left-10 h-16 w-16 rounded-full bg-blue-100 opacity-40"></div>
            <div className="absolute bottom-20 left-20 h-32 w-32 rounded-full bg-primary-yellow/10 opacity-40"></div>

            <div className="w-full space-y-4 sm:space-y-6 z-10 max-w-[1000px]">
              <div className="flex gap-2 items-center">
                <div className="bg-primary-yellow/20 rounded-full w-fit px-4 py-1.5 text-gray-700 border border-amber-200 flex items-center gap-2">
                  <Stars size={16} className="text-amber-500" />
                  <span className="font-medium">Video & Cerita Interaktif</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl leading-tight md:text-5xl lg:text-6xl font-bold text-gray-900">
                <span className="text-primary-blue">
                  Belajar Lebih
                  <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 ml-4">MENYENANGKAN!</span>
                </span>
              </h1>

              <div className="flex flex-col-reverse md:flex-row-reverse gap-8 md:gap-12 items-center">
                <div className="w-full md:w-1/2 rounded-xl bg-white p-4 md:p-6 h-[174px] sm:h-[224px] md:h-[374px] flex items-center justify-center shadow-lg border-2 border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <MacbookPro src="/demo.gif" className="w-full h-full rounded-lg" />
                </div>

                <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-xl text-gray-700 leading-relaxed">
                    Dengan <span className="font-bold text-primary-blue">PINTARU</span>, cukup ketik atau unggah soal, dan kamu akan langsung mendapatkan penjelasan visual berbentuk video atau cerita interaktif. Cocok untuk anak-anak, pelajar, dan siapa pun yang ingin belajar dengan cara yang berbeda.
                  </p>

                  <div className="pt-4 flex flex-wrap justify-between">
                    <Button asChild size="lg" className="w-[48%] bg-gradient-to-r from-amber-400 to-amber-500 py-6 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-amber-300 hover:border-amber-400 rounded-full transform hover:scale-105 flex items-center gap-2">
                      <Link href="/dashboard flex-shrink-0">
                        <Wand2 size={20} className="mr-1 flex-shrink-0" />
                        Belajar Sekarang!
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-[48%] py-6 text-lg font-medium border-2 border-gray-300 hover:border-primary-blue text-gray-700 hover:text-primary-blue rounded-full transition-all duration-300 transform hover:scale-105">
                      <Link href="#about">Pelajari Selengkapnya</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Blocks - Styled like dashboard cards */}
          <div className="bg-gradient-to-r from-primary-blue to-blue-700 text-white px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 right-20 h-20 w-20 rounded-full bg-blue-400 opacity-20"></div>
            <div className="absolute -bottom-5 left-1/4 h-16 w-16 rounded-full bg-blue-400 opacity-10"></div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-400 p-3 rounded-lg shadow-inner">
                      <Book className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">Belajar Personal</p>
                      <p className="text-sm text-blue-100">Pembelajaran yang disesuaikan dengan gaya belajar Anda. Cocok untuk setiap jenis pembelajar.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-400 p-3 rounded-lg shadow-inner">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">Solusi Instan</p>
                      <p className="text-sm text-blue-100">Temukan jawaban lengkap dalam hitungan detik kapan saja, di mana saja yang Anda butuhkan.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-400 p-3 rounded-lg shadow-inner">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">Format Video</p>
                      <p className="text-sm text-blue-100">Nikmati pembelajaran visual langkah demi langkah yang mudah dipahami untuk semua tingkat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section - Styled like dashboard content */}
          <div id="about" className="w-full flex items-center justify-center mx-auto px-4 py-20 lg:py-32 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-yellow-100 opacity-30"></div>
            <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-blue-100 opacity-20"></div>

            <div className="max-w-6xl w-full flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center z-10 -mt-8">
              <div className="w-full md:w-1/2 border-2 border-gray-200 rounded-xl bg-white p-6 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                <Image src="/student-girl.png" alt="Student learning" className="rounded-lg aspect-contain" width={500} height={500} />
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <div className="bg-primary-yellow/20 rounded-full w-fit px-4 py-1.5 text-gray-700 border border-amber-200 flex items-center gap-2">
                  <Stars size={16} className="text-amber-500" />
                  <span className="font-medium">Tentang Kami</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-primary-blue">Mengapa memilih</span>
                  <br />
                  <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">Pintaru?</span>
                </h2>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Pintaru adalah platform pembelajaran inovatif yang menggabungkan kekuatan AI dengan pendekatan visual untuk membantu siswa memahami pelajaran dengan lebih baik. Dengan teknologi AI canggih, kami dapat memberikan penjelasan yang disesuaikan dengan gaya belajar setiap siswa, dilengkapi dengan video pembelajaran yang interaktif dan mudah dipahami.</p>

                <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Stars className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Dapatkan XP untuk setiap pembelajaran!</p>
                      <p className="text-sm text-gray-600">Track progresmu dan tingkatkan pengetahuanmu</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-500 rounded-full transform hover:scale-105 flex items-center gap-2">
                    <Link href="/dashboard">
                      Mulai Petualangan Belajarmu
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section - Similar to dashboard's community section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-4 rounded-full mr-6 shadow-inner">
                    <Book className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Bergabunglah dengan Komunitas Kami!</h2>
                    <p className="text-blue-100">Temukan cerita dan video dari pembelajar lain di seluruh Indonesia</p>
                  </div>
                </div>

                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 border border-blue-400 shadow-md whitespace-nowrap">
                  <Link href="/dashboard">
                    <span className="font-bold">Lihat Komunitas</span>
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Styled to match dashboard */}
        <footer className="w-full bg-secondary-yellow py-12 border-t relative overflow-hidden">
          <div className="absolute -top-10 left-1/3 h-20 w-20 rounded-full bg-amber-300 opacity-20"></div>
          <div className="absolute bottom-10 right-10 h-16 w-16 rounded-full bg-amber-400 opacity-10"></div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Logo and Address */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center bg-white w-fit p-4 rounded-lg shadow-md border-2 border-amber-100 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <Image src="/logo-expand.png" alt="Pintaru Logo" width={300} height={200} className="h-10 w-auto" />
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg text-gray-700 border border-amber-100 shadow-sm">
                  <p className="font-medium">Universitas Indonesia, Depok</p>
                  <p className="text-sm text-gray-600 mt-1">Inovasi Pendidikan Indonesia</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-white border-b-2 border-amber-300 pb-2 w-fit">Kontak Kami</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-amber-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <a href="mailto:info@pintaru.id" className="text-gray-700 hover:text-amber-500 transition-colors">
                      info@pintaru.id
                    </a>
                  </div>

                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-amber-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <a href="tel:+6282113383767" className="text-gray-700 hover:text-amber-500 transition-colors">
                      +62 821 1338 3767
                    </a>
                  </div>

                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-amber-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:scale-105">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <rect width="20" height="20" x="2" y="2" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="18" cy="6" r="0.5" fill="currentColor" />
                      </svg>
                    </div>
                    <a href="https://instagram.com/pintaru.id" className="text-gray-700 hover:text-amber-500 transition-colors">
                      pintaru.id
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-white border-b-2 border-amber-300 pb-2 w-fit">Pintaru.id</h3>
                <div className="flex flex-col gap-3">
                  <Link href="/dashboard" className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-amber-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:scale-105 text-gray-700 hover:text-amber-500">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Wand2 size={18} className="text-amber-500" />
                    </div>
                    Demo Aplikasi
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 text-center border-t border-amber-300/50">
              <p className="text-white font-medium">Copyright © 2025 Fasilkom dan FT</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
