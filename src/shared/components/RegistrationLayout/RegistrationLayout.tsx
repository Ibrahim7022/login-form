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
          <div>
            <p className="text-sm text-gray-label mb-2">Let&apos;s get started</p>
            <h1 className="text-4xl font-bold text-navy leading-tight mb-3">
              Create your account
            </h1>
            <p className="text-sm text-gray-label max-w-sm">
              Follow the steps to create your account
            </p>
          </div>
          <SidebarIllustration />
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
