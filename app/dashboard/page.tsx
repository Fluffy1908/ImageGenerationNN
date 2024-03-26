import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  if (!user) {
    return redirect('/signin');
  }

  return (
    <>
      <p>Dashboard</p>
    </>
  );
}
