import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}

export function TabBarIcon({ name, color, size = 24 }: TabBarIconProps): React.ReactElement {
  return (
    <FontAwesome
      size={size}
      name={name}
      color={color}
      style={styles.icon}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
