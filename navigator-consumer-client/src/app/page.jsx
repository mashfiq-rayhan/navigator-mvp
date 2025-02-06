import Link from 'next/link';
import LogoLink from '@/components/ui/custom/logoLink';

import classes from './page.module.css';

export default function Welcome() {
  return (
    <div className={classes.background}>
      <div className={classes.welcomeBox}>
        <LogoLink />
        <p className={classes.subtitle}>
          Your Mikrotik Router HotSpot Management System
        </p>
        <Link href="/login">
          <button className={classes.button}>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}
