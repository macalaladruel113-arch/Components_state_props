import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/tab-bar-icon';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout(): React.ReactElement {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#4A90E2',
        headerShown: true,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          headerShown: false,
          tabBarIcon: ({ color }): React.ReactElement => (
            <TabBarIcon name={"person" as any} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
