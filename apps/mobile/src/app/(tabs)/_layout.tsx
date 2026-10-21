import { NativeTabs } from 'expo-router/native-tabs';

import { colors } from '@/constants/theme';

// One Foodeez app for everyone. Approved chefs get the Chef tab ("chef mode"),
// similar to host mode in other marketplaces. Until accounts exist, it's always shown.
export default function TabLayout() {
  return (
    <NativeTabs
      backgroundColor={colors.paper}
      indicatorColor={colors.cream}
      labelStyle={{ selected: { color: colors.accent } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Discover</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'fork.knife.circle', selected: 'fork.knife.circle.fill' }}
          md="restaurant"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chef">
        <NativeTabs.Trigger.Label>Chef</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'frying.pan', selected: 'frying.pan.fill' }}
          md="skillet"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="account_circle"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
