import { BaseHeader } from '@/widgets';

interface BaseLayoutProps {
  children: React.ReactNode;
}
export default async function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <BaseHeader />
      {children}
    </>
  );
}
