'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/api';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean>(() => isLoggedIn());

  useEffect(() => {
    const check = () => {
      const v = isLoggedIn();
      setOk(v);
      if (!v) router.replace('/login');
    };
    check();
    window.addEventListener('auth:changed', check);
    window.addEventListener('storage', check);
    return () => {
      window.removeEventListener('auth:changed', check);
      window.removeEventListener('storage', check);
    };
  }, [router]);

  if (!ok) return null; // ফ্ল্যাশ এড়াতে
  return <>{children}</>;
}
