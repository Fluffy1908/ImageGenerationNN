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

  return (
    <section className="flex">
      <Sidebar />
      <div className="text-black">
        <img src={user.user_metadata.avatar_url} alt="Avatar" />
        <p>Your name: {user.user_metadata.full_name} </p>
        <NameForm user={user} />
        <p>Email: {user.email}</p>
      </div>
    </section>
  );
}
