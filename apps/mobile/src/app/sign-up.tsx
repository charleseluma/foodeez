import { router } from 'expo-router';
import { useState } from 'react';
import { PASSWORD_MIN } from '@foodeez/shared';

import { Field, FormMessage } from '@/components/form';
import { Body, Button, Eyebrow, Panel, Screen, Title } from '@/components/ui';
import { supabase } from '@/lib/supabase';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (name.trim().length < 2) return setError('Enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Enter a valid email address.');
    if (password.length < PASSWORD_MIN) return setError(`Use at least ${PASSWORD_MIN} characters for your password.`);
    setBusy(true);
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() } },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (data.session) router.back();
    else setSentTo(email.trim());
  }

  if (sentTo) {
    return (
      <Screen>
        <Eyebrow>Almost there</Eyebrow>
        <Title>Check your email.</Title>
        <Body muted>We sent a confirmation link to {sentTo}. Open it, then come back and sign in.</Body>
        <Button label="Go to sign in" onPress={() => router.replace('/sign-in')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Eyebrow>Join Foodeez</Eyebrow>
      <Title>Create your account.</Title>
      <Body muted>One account for everything: book seats as a guest, and apply to cook as a chef.</Body>
      <Field label="Your name" value={name} onChangeText={setName} autoComplete="name" textContentType="name" />
      <Field label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" />
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" textContentType="newPassword" hint={`At least ${PASSWORD_MIN} characters.`} />
      <FormMessage text={error} />
      <Button label={busy ? 'Creating account…' : 'Create account'} variant="accent" onPress={submit} disabled={busy} />
      <Button label="I already have an account" variant="outline" onPress={() => router.replace('/sign-in')} />
      <Panel>
        <Body muted>Your password is never stored on this phone. Foodeez keeps you signed in with a secure session token.</Body>
      </Panel>
    </Screen>
  );
}
