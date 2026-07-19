import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Logout() {
  const supabase = createClient();

  await (await supabase).auth.signOut();

  redirect('/auth/login');
}
