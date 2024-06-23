'use client';

import { ModalTools } from '@/features';
import { BaseStyle, HeaderStyle, montserrat } from '@/shared';
import clsx from 'clsx';

interface HeaderLayoutProps {
  tools: ModalTools;
  headerLinks: React.ReactNode;
  headerIcons: React.ReactNode;
}

export const HeaderLayout = ({
  tools,
  headerIcons,
  headerLinks,
}: HeaderLayoutProps) => {
  const { state, toggle } = tools;

  return (
    <header
      className={clsx(
        HeaderStyle.header,
        BaseStyle.container,
        montserrat.className
      )}
    >
      <section>Famous Perfume</section>
      <section className={HeaderStyle.headerLinks}>{headerLinks}</section>
      <section className={HeaderStyle.headerIcons}>{headerIcons}</section>
      <section
        className={clsx(HeaderStyle.headerBurger, state && HeaderStyle.open)}
        onClick={toggle}
      >
        <div id='rect-1'></div>
        <div id='rect-2'></div>
        <div id='rect-3'></div>
      </section>
    </header>
  );
};
