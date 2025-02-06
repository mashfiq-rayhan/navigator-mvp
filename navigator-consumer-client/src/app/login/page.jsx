import { loginUser } from '@/actions/login';
import LoginForm from '@/components/features/login/login-form';

export default async function Login({ searchParams }) {
  const {
    hostIP,
    hostId,
    hostRedirect,
    userMAC,
    userIP,
    username,
    chapId,
    chapChallenge,
    linkLogin,
    linkOrig,
    linkLoginOnly,
    linkOrigEsc,
    error,
    macEsc
  } = await searchParams;

  return <LoginForm userMAC={userMAC} userIP={userIP} hostIP={hostIP} action={loginUser} />;
}
