import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

export default async function HomePage({ children }: HomeProps) {
  return <>{children}</>;
}
