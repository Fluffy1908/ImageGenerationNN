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

  let { data: prices } = await supabase.from('prices').select('*');

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
  console.log('Prices start: ', prices); //Prices database query example

  return (
    <section className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex flex-col space-y-6">
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="">
            <p className="text-black">
              Username: {user.user_metadata.full_name}
            </p>
            <NameForm userName={user.user_metadata.full_name} />
          </div>
          <div className="">
            <p className="text-black ">Email: {user.email}</p>
            <EmailForm userEmail="" />
          </div>
        </div>
      </div>
    </section>
  );
}
