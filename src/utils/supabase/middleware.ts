import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect authenticated users away from auth pages (except logout)
  if (user && request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/auth/logout')) {
    // If user is logged in and trying to access login or register, redirect to dashboard
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard'; // Keep redirecting to /dashboard initially
    return NextResponse.redirect(url);
  }

  // --- Start: Dashboard Redirection based on user_type ---
  if (user && request.nextUrl.pathname === '/dashboard') {
    const userType = user.user_metadata?.user_type;
    const targetPath = userType === 'kids' ? '/dashboard/kids' : userType === 'teens' ? '/dashboard/teens' : null;

    if (targetPath) {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      return NextResponse.redirect(url);
    }
    // Optional: Handle cases where user_type is missing or invalid, maybe redirect to a profile setup or error page
    // else { redirect to /profile-setup or similar }
  }
  // --- End: Dashboard Redirection based on user_type ---

  // --- Start: Dashboard Access Control ---
  if (user && request.nextUrl.pathname.startsWith('/dashboard/')) {
    const userType = user.user_metadata?.user_type;
    const requestedDashboard = request.nextUrl.pathname.split('/')[2]; // e.g., 'kids' or 'teens'

    // Allow access if the user type matches the requested dashboard
    if (userType === requestedDashboard) {
      // Allow request to proceed
    } else {
      // If types don't match, redirect to their correct dashboard
      const correctPath = userType === 'kids' ? '/dashboard/kids' : userType === 'teens' ? '/dashboard/teens' : '/dashboard'; // Fallback to /dashboard if type is unknown
      const url = request.nextUrl.clone();
      url.pathname = correctPath;
      // Prevent infinite redirect loop if correctPath is already /dashboard and type is unknown
      if (correctPath === '/dashboard' && request.nextUrl.pathname === '/dashboard') {
        // Do nothing, or handle error/logout
      } else if (correctPath !== request.nextUrl.pathname) {
        return NextResponse.redirect(url);
      }
    }
  }
  // --- End: Dashboard Access Control ---

  if (!user && !request.nextUrl.pathname.startsWith('/auth') && request.nextUrl.pathname !== '/') {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
