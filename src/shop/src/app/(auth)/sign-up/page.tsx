import { AuthStyle } from '@/shared';
import { SignUpForm } from '@/widgets/auth/ui/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page Description',
};

export default async function Page() {
  return (
    <div className={AuthStyle.pageAuthLayout}>
      <SignUpForm />
    </div>
  );
}
