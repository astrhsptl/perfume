import { ProductHeader } from '@/widgets';

interface ProductLayoutProps {
  children: React.ReactNode;
}
export default async function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <>
      <ProductHeader />
      {children}
    </>
  );
}
