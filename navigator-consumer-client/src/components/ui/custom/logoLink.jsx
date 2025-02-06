import Link from 'next/link';
import Image from 'next/image';

import logoImg from '../../../assets/icon.png';
import classes from './logoLink.module.css';

export default function LogoLink() {
  return (
    <Link href="/" className={classes.logo}>
      <Image src={logoImg} alt="navigator logo" className={classes.logoImg} />
      <h1 className={classes.logoText}>Navigator</h1>
    </Link>
  );
}
