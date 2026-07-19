'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { resetPassword } from '@/app/actions/auth';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg">
      {pending ? 'Sending reset link...' : 'Send reset link'}
    </Button>
  );
}

function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  const clientAction = async (formData: FormData) => {
    try {
      const response = await resetPassword(formData);

      if (response.success) {
        toast.success('Password reset link sent to your email');
        setEmailSent(true);
      } else if (response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      toast.error('Failed to send reset link');
    }
  };

  return (
    <div className="w-full px-8 md:px-12 items-center sm:justify-center">
      <form action={clientAction} className="w-full max-w-md mx-auto">
        <Card className="w-full sm:w-full border-none shadow-xl bg-white/90 backdrop-blur-sm rounded-xl">
          <CardHeader className="space-y-3">
            <div className="mx-auto flex justify-center mb-6">
              <Image src="/logo-small.svg" alt="Jawab.in Logo" width={64} height={64} priority />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
            <CardDescription className="text-center text-sm opacity-80">{emailSent ? 'Check your email for a link to reset your password' : "Enter your email address and we'll send you a link to reset your password"}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-5 pt-4">
            {!emailSent && (
              <div className="relative group">
                <Input type="email" required id="email" name="email" className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your email address" />
                <Mail className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
            )}

            {emailSent && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-center">We&apos;ve sent an email to the address you provided with instructions to reset your password.</p>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-5">
              {!emailSent && <SubmitButton />}

              {emailSent && (
                <Button type="button" onClick={() => setEmailSent(false)} className="w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg">
                  Try again
                </Button>
              )}

              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-input/50"></div>
                <span className="relative px-2 bg-white text-xs text-muted-foreground">OR</span>
              </div>
              <Button variant="outline" size="sm" className="w-full h-11 border border-input/80 hover:border-primary/30 hover:bg-primary/5 transition-all font-medium" asChild>
                <Link href="/auth/login" className="flex gap-1 items-center justify-center">
                  Remember your password? <span className="text-primary font-semibold">Sign in</span>
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export { ForgotPasswordPage };
