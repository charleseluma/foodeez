import { Body, Button, Eyebrow, Panel, Screen, Title } from '@/components/ui';

export default function ProfileScreen() {
  return (
    <Screen>
      <Eyebrow>Your Foodeez</Eyebrow>
      <Title>Food is better experienced together.</Title>
      <Body muted>
        Sign in to save experiences, book seats, follow chefs and build your taste profile.
      </Body>
      <Button label="Sign in" disabled />
      <Button label="Create an account" variant="outline" disabled />
      <Panel>
        <Body muted>Accounts are coming soon. For now, explore the preview.</Body>
      </Panel>
    </Screen>
  );
}
