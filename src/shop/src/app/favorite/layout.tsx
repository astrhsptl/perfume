import { ProductHeader } from '@/widgets';

interface FavoriteLayoutProps {
  children: React.ReactNode;
}
export default async function FavoriteLayout({
  children,
}: FavoriteLayoutProps) {
  return (
    <>
      <ProductHeader />
      {children}
    </>
  );
}
