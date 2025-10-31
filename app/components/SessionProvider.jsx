'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export default function SessionProvider({ children }: { children
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
// }
