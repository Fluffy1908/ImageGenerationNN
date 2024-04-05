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

  // const { data: subscription, error } = await supabase
  //   .from('subscriptions')
  //   .select('*, prices(*, products(*))')
  //   .in('status', ['trialing', 'active'])
  //   .maybeSingle();

  // if (error) {
  //   console.log(error);
  // }

  if (!user) {
    return redirect('/signin');
  }
  ``;

  // let { data: email_preference } = await supabase
  //   .from('users')
  //   .select('email_preference');

  console.log(user);

  return (
    <div className="flex">
      <div className="flex text-center">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="flex flex-col space-y-6">
          {/* Avatar Image */}
          <div className="shadow-lg rounded-full overflow-hidden w-24 h-24 mx-auto">
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Username & NameForm */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 text-lg font-medium">
              Username: {user.user_metadata.full_name}
            </p>
            <NameForm userName={user.user_metadata.full_name} />
          </div>
          {/* Email & EmailForm */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 text-lg font-medium">
              Email: {user.email}
            </p>
            <EmailForm userEmail={user.email} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 text-lg font-medium">
              Ad email preference: True or False
            </p>

            <button className="text-black">Button</button>
          </div>
        </div>
      </div>
    </div>
  );
}
