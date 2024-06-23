import '@/shared/styles/base.css';
import { HeaderModal, RootProvider } from '@/widgets';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='theme-color' content='#000' />
      </head>
      <body suppressHydrationWarning>
        <RootProvider>
          <div id='root'>{children}</div>
          <div id='modal-root'>
            <HeaderModal />
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
