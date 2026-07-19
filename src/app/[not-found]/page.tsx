import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f8f2e0]">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white border border-gray-100 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src="/logo-expand.png" alt="Pintaru Logo" width={150} height={80} className="h-16 w-auto" />
        </div>
        <h1 className="text-6xl font-bold mb-2 text-primary">404</h1>
        <p className="text-lg mb-6 text-gray-700">Halaman Tidak Ditemukan</p>
        <Link href="/" className="px-6 py-3 bg-[#1762d3] hover:bg-secondary text-white rounded-lg font-medium inline-block transition-all duration-200 shadow-md hover:shadow-lg">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
