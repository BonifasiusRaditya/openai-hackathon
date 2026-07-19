'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { anonymousLogin } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Video, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

function SignInPage() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<'kids' | 'teens'>('teens');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnonymousLogin = async (userType: 'kids' | 'teens') => {
    setIsLoading(true);
    try {
      const response = await anonymousLogin(userType);

      if (response.success) {
        toast.success(`Welcome! Logged in as ${userType === 'kids' ? 'Kids' : 'Teens'} user`);
        router.push('/dashboard');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-8 md:px-12 items-center sm:justify-center">
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full sm:w-full border-none shadow-xl bg-white/90 backdrop-blur-sm rounded-xl">
          <CardHeader className="space-y-3">
            <div className="mx-auto flex justify-center mb-3">
              <Image src="/logo-expand.svg" className="w-1/2" alt="PINTARU Logo" width={300} height={300} priority />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-primary-blue">Welcome to PINTARU</CardTitle>
            <p className="text-center text-muted-foreground text-sm">Choose your account type to get started</p>
          </CardHeader>

          <CardContent className="grid gap-y-5 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <Label className="text-sm font-medium text-primary">I am a...</Label>
                <span className="text-xs text-muted-foreground">Select one</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div onClick={() => setSelectedUserType('kids')} className={`relative flex items-center justify-between p-4 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:border-primary/50 ${selectedUserType === 'kids' ? 'border-primary-blue bg-primary-blue/10 ring-2 ring-primary-blue/20' : 'border-input/60 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedUserType === 'kids' ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Kids / Student</p>
                      <p className="text-sm text-muted-foreground">Saya Anak / Pelajar</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedUserType === 'kids' ? 'border-primary-blue bg-primary-blue' : 'border-gray-300'}`}>{selectedUserType === 'kids' && <div className="w-full h-full rounded-full bg-white scale-50"></div>}</div>
                </div>

                <div onClick={() => setSelectedUserType('teens')} className={`relative flex items-center justify-between p-4 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:border-primary/50 ${selectedUserType === 'teens' ? 'border-primary-yellow bg-primary-yellow/10 ring-2 ring-primary-yellow/20' : 'border-input/60 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedUserType === 'teens' ? 'bg-primary-yellow text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Video size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Teens / Adult</p>
                      <p className="text-sm text-muted-foreground">Saya Remaja / Dewasa</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedUserType === 'teens' ? 'border-primary-yellow bg-primary-yellow' : 'border-gray-300'}`}>{selectedUserType === 'teens' && <div className="w-full h-full rounded-full bg-white scale-50"></div>}</div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button onClick={() => handleAnonymousLogin(selectedUserType)} disabled={isLoading} className={`w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg ${selectedUserType === 'kids' ? 'bg-primary-blue hover:bg-primary-blue/90' : 'bg-primary-yellow hover:bg-primary-yellow/90'}`}>
                {isLoading ? 'Signing in...' : `Continue as ${selectedUserType === 'kids' ? 'Kids' : 'Teens'}`}
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Demo Mode - No registration required</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export { SignInPage };
