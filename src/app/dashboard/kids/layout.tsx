'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './shared/Navbar/Navbar';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-300 to-amber-300 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,215,120,0.4)_0%,transparent_40%),radial-gradient(circle_at_80%_40%,rgba(120,190,255,0.4)_0%,transparent_50%)] pointer-events-none"></div>

      {/* Animated floating shapes */}
      <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-yellow-300 opacity-50 animate-[float_8s_ease-in-out_infinite] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-blue-300 opacity-40 animate-[float_12s_ease-in-out_2s_infinite] pointer-events-none"></div>
      <div className="absolute bottom-[15%] left-[30%] w-20 h-20 rounded-full bg-indigo-300 opacity-30 animate-[float_10s_ease-in-out_1s_infinite] pointer-events-none"></div>
      <div className="absolute bottom-[25%] right-[8%] w-20 h-20 rounded-full bg-amber-200 opacity-60 animate-[float_7s_ease-in-out_3s_infinite] pointer-events-none"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%221%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%223%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] pointer-events-none"></div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col">
          <div className="fixed top-0 w-full z-50">
            <Navbar />
          </div>
          <div className="mt-[60px] px-3 md:px-10 lg:px-20 md:pt-10 pb-32 md:pb-10 relative z-10">
            <div className="max-w-6xl pb-10 mx-auto">
              <div className="flex flex-col gap-6">{children}</div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
