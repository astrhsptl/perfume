'use client';

import { FooterStyles } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';

interface ColumnProps {
  title: string;
  rows: {
    link: string;
    title: string;
    icon?: string;
    click?: () => void;
  }[];
}

export const Column = ({ rows, title }: ColumnProps) => {
  return (
    <div>
      <p className={FooterStyles.columnTitle}>{title}</p>
      <ul>
        {rows.map(({ link, title, click, icon }) => (
          <li key={title} onClick={click} style={{ marginBottom: 4 }}>
            <Link href={link} className={FooterStyles.columnLink}>
              {icon ? (
                <Image src={icon} alt={title} height={12} width={12} />
              ) : (
                <></>
              )}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
