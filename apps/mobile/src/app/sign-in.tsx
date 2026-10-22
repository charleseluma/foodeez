import { router } from 'expo-router';
import { useState } from 'react';

import { Field, FormMessage } from '@/components/form';
import { Button, Eyebrow, Screen, Title } from '@/components/ui';
import { supabase } from '@/lib/supabase';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setError(
        error.code === 'email_not_confirmed'
          ? 'Please confirm your email first. Check your inbox for the link.'
          : "That email and password don't match.",
      );
      return;
    }
    router.back();
  }

  return (
    <Screen>
      <Eyebrow>Welcome back</Eyebrow>
      <Title>Sign in.</Title>
      <Field label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" />
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="current-password" textContentType="password" onSubmitEditing={submit} />
      <FormMessage text={error} />
      <Button label={busy ? 'Signing in…' : 'Sign in'} onPress={submit} disabled={busy} />
      <Button label="Create an account" variant="outline" onPress={() => router.replace('/sign-up')} />
    </Screen>
  );
}
