import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page Description',
};

export default async function Page() {
  return <div>Page</div>;
}
