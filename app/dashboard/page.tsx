import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar/Sidebar';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  //users query
  let { data: users } = await supabase.from('users').select('*');

  // console.log(user);
  // console.log('Users query ', users); //Prices database query example

  return (
    <div className="flex text-black">
      <div className="flex text-center">
        <Sidebar />
      </div>
      <div className="ml-5">
        <p>Dashboard</p>
        {user && <p>Hi, {user.user_metadata.full_name}. How are you today?</p>}
        {user && <p>Your email: {user.email}</p>}
      </div>
    </div>
  );
}
