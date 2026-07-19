import * as React from 'react';

import { cn } from '@/lib/utils';

// Extend the basic HTML input attributes
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Adding this comment to prevent TypeScript linting error
  // This interface can be extended with additional props when needed
  wrapperClassName?: string; // Optional class for potential future wrapper element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none', className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
