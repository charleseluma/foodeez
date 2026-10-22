import type { Session } from '@supabase/supabase-js';
import type { ChefApplication } from '@foodeez/shared';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { supabase, supabaseConfigured } from './supabase';

type SessionState = {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  fullName: string;
  application: ChefApplication | null;
  /** Re-reads the profile and chef application from the database. */
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(supabaseConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullName] = useState('');
  const [application, setApplication] = useState<ChefApplication | null>(null);

  const load = useCallback(async (s: Session | null) => {
    if (!s) {
      setFullName('');
      setApplication(null);
      return;
    }
    const [{ data: profile }, { data: app }] = await Promise.all([
      supabase.from('profiles').select('full_name').eq('id', s.user.id).maybeSingle(),
      supabase.from('chef_applications').select('*').eq('user_id', s.user.id).maybeSingle(),
    ]);
    setFullName(profile?.full_name ?? '');
    setApplication((app as ChefApplication | null) ?? null);
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) return;
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await load(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      // Defer database calls out of the auth callback, as Supabase recommends.
      setTimeout(() => load(s), 0);
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const value: SessionState = {
    configured: supabaseConfigured,
    loading,
    session,
    fullName,
    application,
    refresh: () => load(session),
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}

/** True when the signed-in person is an approved chef ("chef mode"). */
export function useIsChef() {
  return useSession().application?.status === 'approved';
}
