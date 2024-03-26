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
    <section className="text-center mt-6">
      <p>Dashboard</p>
      {user && <p>Hi, {user.user_metadata.full_name}. How are you today?</p>}
      {user && <p>Your email: {user.email}</p>}
    </section>
  );
}
