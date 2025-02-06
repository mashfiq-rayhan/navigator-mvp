'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import classes from './login-form.module.css';
import LogoLink from '@/components/ui/custom/logoLink';

export default function LoginForm({ userMAC, userIP, hostIP, action }) {
  const [state, setState] = useState({});
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await action(null, formData);

    if (result.errors) {
      setState({ errors: result.errors });
    } else if (result.success) {
      router.push(result.redirectUrl);
    }
  }

  return (
    <div className={classes.background}>
      <div className={classes.loginBox}>
        <LogoLink />
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className={classes.inputGroup}>
            <label htmlFor="phoneNumber" className={classes.label}>
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Login with Phone Number"
              className={classes.input}
              required
            />
          </div>
          <input type="hidden" name="userMAC" value={userMAC} />
          <input type="hidden" name="userIP" value={userIP} />
          <input type="hidden" name="hostIP" value={hostIP} />
          <button type="submit" className={classes.button}>
            Continue
          </button>
          {state.errors && (
            <ul className={classes.formErrors}>
              {state.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
        {/* <Link href="/signup">SignUP</Link> */}
      </div>
    </div>
  );
}
