import '@/shared/styles/base.css';
import { Header, HeaderModal, RootProvider } from '@/widgets';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='theme-color' content='#fff' />
      </head>
      <body suppressHydrationWarning>
        <RootProvider>
          <div id='root'>
            <Header />
            {children}
          </div>
          <div id='modal-root'>
            <HeaderModal />
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
