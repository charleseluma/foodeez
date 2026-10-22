import { router } from 'expo-router';
import { useState } from 'react';
import {
  BIO_MAX,
  LAUNCH_STATES,
  STATUS_COPY,
  emptyChefApplication,
  fromChefApplication,
  toChefApplicationRow,
  validateChefApplication,
  type ChefApplicationInput,
  type FieldErrors,
  type LaunchState,
} from '@foodeez/shared';

import { Choice, Field, FormMessage, Toggle } from '@/components/form';
import { Body, Button, Eyebrow, Screen, Title } from '@/components/ui';
import { useSession } from '@/lib/session';
import { supabase } from '@/lib/supabase';

const stateOptions = LAUNCH_STATES.map((s) => ({ value: s.code as LaunchState, label: s.code }));

export default function ChefApplyScreen() {
  const { session, fullName, application, refresh } = useSession();
  const [form, setForm] = useState<ChefApplicationInput>(
    application ? fromChefApplication(application) : { ...emptyChefApplication, display_name: fullName },
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState({ text: '', tone: 'error' as 'error' | 'success' });
  const [busy, setBusy] = useState(false);

  if (!session) {
    return (
      <Screen>
        <Title>Sign in first.</Title>
        <Body muted>You need a Foodeez account to apply.</Body>
        <Button label="Create an account" onPress={() => router.replace('/sign-up')} />
      </Screen>
    );
  }

  const set = <K extends keyof ChefApplicationInput>(key: K, value: ChefApplicationInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit() {
    const found = validateChefApplication(form);
    setErrors(found);
    if (Object.keys(found).length) return setMessage({ text: 'Please fix the highlighted answers.', tone: 'error' });
    setBusy(true);
    setMessage({ text: '', tone: 'error' });
    const { user_id, ...fields } = toChefApplicationRow(form, session!.user.id);
    const { error } = application
      ? await supabase.from('chef_applications').update(fields).eq('id', application.id)
      : await supabase.from('chef_applications').insert({ user_id, ...fields });
    setBusy(false);
    if (error) return setMessage({ text: "We couldn't save your application. Please try again.", tone: 'error' });
    await refresh();
    if (application) setMessage({ text: 'Changes saved.', tone: 'success' });
    else router.back();
  }

  return (
    <Screen>
      <Eyebrow>Chef application</Eyebrow>
      <Title>{application ? 'Your application.' : 'Cook for Foodeez.'}</Title>
      <Body muted>
        {application
          ? STATUS_COPY.pending.body
          : 'Tell us about your cooking. The Foodeez team reviews every application before a chef can sell seats.'}
      </Body>
      <Field label="Chef name guests will see" value={form.display_name} onChangeText={(v) => set('display_name', v)} error={errors.display_name} />
      <Field label="City" value={form.city} onChangeText={(v) => set('city', v)} error={errors.city} />
      <Choice label="State" options={stateOptions} value={form.state} onChange={(v) => set('state', v)} error={errors.state} />
      <Field label="Phone" value={form.phone} onChangeText={(v) => set('phone', v)} keyboardType="phone-pad" textContentType="telephoneNumber" hint="Only the Foodeez team sees this." error={errors.phone} />
      <Field label="Years cooking" value={form.experience_years} onChangeText={(v) => set('experience_years', v.replace(/\D/g, ''))} keyboardType="number-pad" error={errors.experience_years} />
      <Field label="What do you cook?" placeholder="e.g. Nigerian, West African, modern Southern" value={form.cuisines} onChangeText={(v) => set('cuisines', v)} error={errors.cuisines} />
      <Field label="About you" multiline maxLength={BIO_MAX} placeholder="Your story, your food, and the experiences you want to host." value={form.bio} onChangeText={(v) => set('bio', v)} hint={`${form.bio.trim().length} / ${BIO_MAX}`} error={errors.bio} />
      <Field label="Links (optional)" placeholder="Instagram, website, past events" autoCapitalize="none" value={form.links} onChangeText={(v) => set('links', v)} error={errors.links} />
      <Toggle label="I hold a current food-handler or food-safety certification (e.g. ServSafe)." value={form.food_safety_cert} onChange={(v) => set('food_safety_cert', v)} />
      <FormMessage text={message.text} tone={message.tone} />
      <Button label={busy ? 'Saving…' : application ? 'Save changes' : 'Submit application'} variant="accent" onPress={submit} disabled={busy} />
    </Screen>
  );
}
