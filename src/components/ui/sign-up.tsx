'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { register } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, KeyRound, Mail, UserRound, CheckCircle2, Video, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

// Stepper component to show progress
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep ? 'bg-primary-blue text-white' : index === currentStep ? 'bg-primary-blue/10 border-2 border-primary-blue text-primary-blue' : 'bg-gray-100 text-gray-400'}`}>{index < currentStep ? <CheckCircle2 size={16} /> : index + 1}</div>
            <span className="text-xs mt-1 text-center w-20 truncate">{index === 0 ? 'Account Info' : 'Account Type'}</span>
            {index < totalSteps - 1 && <div className={`absolute top-4 left-full w-[calc(100%)] h-0.5 -ml-6 ${index < currentStep ? 'bg-primary-blue' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordNotEmpty, setIsPasswordNotEmpty] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState('teens');

  // Store form data between steps
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const totalSteps = 2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setIsPasswordNotEmpty(value !== '');
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current step
    if (currentStep === 0) {
      if (!formData.full_name) {
        toast.error('Full name is required');
        return;
      }
      if (!formData.email) {
        toast.error('Email is required');
        return;
      }
      if (!formData.password) {
        toast.error('Password is required');
        return;
      }
      if (formData.password !== formData.confirm_password) {
        toast.error('Passwords do not match');
        return;
      }
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const data = new FormData();
      data.append('full_name', formData.full_name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('confirm_password', formData.confirm_password);
      data.append('user_type', accountType);

      const response = await register(data);

      if (response.success) {
        toast.success('Account created successfully');
        router.push('/dashboard');
      } else if (response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed');
    }
  };

  // Go back to previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full px-8 md:px-12 items-center sm:justify-center">
      <form onSubmit={handleNextStep} className="w-full max-w-md mx-auto">
        <Card className="w-full sm:w-full border-none shadow-xl bg-white/90 backdrop-blur-sm rounded-xl">
          <CardHeader className="space-y-3">
            <div className="mx-auto flex justify-center mb-6">
              <Image src="/logo-expand.svg" className="w-1/2" alt="Jawab.in Logo" width={300} height={300} priority />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-primary-blue mb-5">Daftar Akun PINTARU</CardTitle>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </CardHeader>

          <CardContent className="grid gap-y-5">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <>
                <div className="relative group">
                  <Input type="text" required id="full_name" name="full_name" value={formData.full_name} onChange={handleInputChange} className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your full name" />
                  <UserRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>

                <div className="relative group">
                  <Input type="email" required id="email" name="email" value={formData.email} onChange={handleInputChange} className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your email address" />
                  <Mail className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>

                <div className="relative group">
                  <Input type={showPassword ? 'text' : 'password'} required id="password" name="password" value={formData.password} onChange={handleInputChange} className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your password" />
                  <KeyRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  {showPassword ? <EyeOff className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(false)} /> : <Eye className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(true)} />}
                </div>

                {isPasswordNotEmpty && (
                  <div className="relative group">
                    <Input type={showConfirmPassword ? 'text' : 'password'} required id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Confirm your password" />
                    <KeyRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    {showConfirmPassword ? <EyeOff className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowConfirmPassword(false)} /> : <Eye className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowConfirmPassword(true)} />}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Account Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-sm font-medium text-primary">Account Type</Label>
                  <span className="text-xs text-muted-foreground">Select one</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div onClick={() => setAccountType('kids')} className={`relative flex flex-col items-center justify-center   h-32 cursor-pointer rounded-lg border p-2.5 transition-all duration-200 hover:border-primary/50 ${accountType === 'kids' ? 'border-primary text-white bg-primary-blue' : 'border-input/60 text-black'}`}>
                    <BookOpen size={40} fill={accountType === 'kids' ? 'white' : 'black'} />

                    <p className="font-bold">Saya Anak / Pelajar</p>
                    <p>Kids</p>
                  </div>

                  <div onClick={() => setAccountType('teens')} className={`relative flex flex-col items-center justify-center h-32 cursor-pointer rounded-lg border p-2.5 transition-all duration-200 hover:border-primary/50 ${accountType === 'teens' ? 'border-primary text-white bg-primary-yellow ring-2' : 'border-input/60 text-black'}`}>
                    <Video size={40} fill={accountType === 'teens' ? 'white' : 'black'} />

                    <p className="font-bold">Saya Remaja / Dewasa</p>
                    <p>Non-kids</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-5">
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" className="w-1/3 h-12" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}
                <Button type="submit" className={`h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg ${currentStep > 0 ? 'w-2/3' : 'w-full'}`}>
                  {currentStep === totalSteps - 1 ? 'Sign up' : 'Next step'}
                </Button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-input/50"></div>
                <span className="relative px-2 bg-white text-xs text-muted-foreground">OR</span>
              </div>
              <Button variant="outline" size="sm" className="w-full h-11 border border-input/80 hover:border-primary/30 hover:bg-primary/5 transition-all font-medium" asChild>
                <Link href="/auth/login" className="flex gap-1 items-center justify-center">
                  Already have an account? <span className="text-primary font-semibold">Log in</span>
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export { SignUpPage };
