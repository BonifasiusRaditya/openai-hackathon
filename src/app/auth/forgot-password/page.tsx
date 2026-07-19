import { ForgotPasswordPage } from '@/components/ui/forgot-password';
import Image from 'next/image';

export default function ForgotPassword() {
  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="hidden h-screen md:flex md:w-1/2 lg:w-7/12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10"></div>
        <Image src={'https://images.unsplash.com/photo-1625111381887-458fce74a923?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="forgot password" width={1742} height={1080} className="w-full h-full object-cover object-center transition-transform duration-10000 hover:scale-110" priority />
        <div className="absolute bottom-8 left-8 z-20 max-w-md">
          <h2 className="text-white text-3xl font-bold mb-4">Password Recovery</h2>
          <p className="text-white/80 text-lg">We&apos;ll help you get back into your account. Enter your email to receive a password reset link.</p>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 lg:w-5/12 justify-center items-center">
        <ForgotPasswordPage />
      </div>
    </div>
  );
}
