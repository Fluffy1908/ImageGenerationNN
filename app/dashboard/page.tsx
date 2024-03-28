import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar/Sidebar';

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
    <section className="flex mt-6 text-black">
      {/* Add flex here to work */}
      <Sidebar />
      <div className="ml-5">
        <p>Dashboard</p>
        {user && <p>Hi, {user.user_metadata.full_name}. How are you today?</p>}
        {user && <p>Your email: {user.email}</p>}
      </div>
    </section>
  );
}
