'use client';

import { FooterStyles, montserrat, useClipboard } from '@/shared';
import clsx from 'clsx';
import { Column } from './ui';

interface FooterProps {}
export const Footer = ({}: FooterProps) => {
  const date = new Date();
  const { write } = useClipboard();

  return (
    <footer className={clsx(FooterStyles.footer, montserrat.className)}>
      <div className={FooterStyles.columnContainer}>
        <Column
          title='Разделы'
          rows={[
            { title: 'Домой', link: '/' },
            { title: 'Товары', link: '/products' },
            { title: 'Личный кабинет', link: '/user' },
          ]}
        />
        <Column
          title='Обратная связь'
          rows={[
            {
              title: '+7 (960) 446-93-20',
              link: '#',
              icon: '/phone.svg',
              click: () => write('+7 (960) 446-93-20'),
            },
            {
              title: 'some@milo.com',
              link: '#',
              icon: '/mail.svg',
              click: () => write('some@milo.com'),
            },
          ]}
        />
        <Column
          title='О сайте'
          rows={[
            { title: 'Лицензия', link: '#' },
            { title: 'Правила площадки', link: '#' },
            { title: 'Пользовательское соглашение', link: '#' },
          ]}
        />
      </div>
      <p className={FooterStyles.columnTitle}>
        Famous perfume {date.getFullYear()}
      </p>
    </footer>
  );
};
