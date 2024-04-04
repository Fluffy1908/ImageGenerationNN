'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowButtonPressed, setIsShowButtonPressed] = useState(false); // Added for conditional rendering

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  const handleShowButtonPress = () => {
    // Function to toggle form visibility
    setIsShowButtonPressed(!isShowButtonPressed);
  };

  return (
    <div>
      <p
        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
        onClick={handleShowButtonPress}
      >
        {isShowButtonPressed ? 'Cancel' : 'Do you want to change your email?'}
      </p>
      {isShowButtonPressed && (
        <Card
          title=""
          description="Please enter the email address you want to use to login."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                We will email you to verify the change.
              </p>
              <Button
                variant="slim"
                type="submit"
                form="emailForm"
                loading={isSubmitting}
              >
                Update Email
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="newEmail"
                className="w-full p-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue=""
                placeholder="Your new email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}
