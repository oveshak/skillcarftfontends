'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/api';

export default function GuestGuard({
  children,
  redirectTo = '/',
}: {
  children: React.ReactNode;
  redirectTo?: string; // চাইলে '/dashboard' দাও
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const ok = isLoggedIn();
    if (ok) {
      router.replace(redirectTo);
    } else {
      setChecked(true);
    }
    const onAuth = () => {
      if (isLoggedIn()) router.replace(redirectTo);
    };
    window.addEventListener('auth:changed', onAuth);
    return () => window.removeEventListener('auth:changed', onAuth);
  }, [router, redirectTo]);

  if (!checked) return null;
  return <>{children}</>;
}
