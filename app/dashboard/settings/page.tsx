import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
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

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }
  ``;

  console.log(user);

  return (
    <section className="flex min-h-screen text-center">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex flex-col items-center space-y-6">
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-lg font-semibold">
            <p className="text-black">
              Your name: {user.user_metadata.full_name}
            </p>
          </div>
          <NameForm userName={user.user_metadata.full_name} />
          <div className="text-lg">
            <p className="text-black ">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
