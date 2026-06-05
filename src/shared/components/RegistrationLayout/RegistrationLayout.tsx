import type { ReactNode } from 'react';
import { SidebarIllustration } from './SidebarIllustration';
import styles from './RegistrationLayout.module.scss';

interface RegistrationLayoutProps {
  children: ReactNode;
}

export const RegistrationLayout = ({ children }: RegistrationLayoutProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.pattern} aria-hidden />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarText}>
            <p className={styles.eyebrow}>Let&apos;s get started</p>
            <h1 className={styles.heading}>Create your account</h1>
            <p className={styles.subheading}>
              Follow the steps to create your account
            </p>
          </div>
          <div className={styles.illustrationWrap}>
            <SidebarIllustration className={styles.illustration} />
          </div>
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
