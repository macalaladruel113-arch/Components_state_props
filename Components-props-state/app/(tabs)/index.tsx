import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const [count, setCount] = useState(100);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.screenCard}>
        <View style={styles.titleContainer}>
          <View style={styles.titleBadge}>
            <ThemedText type="title" style={styles.titleText}>
              Parent Component
            </ThemedText>
          </View>
          <HelloWave />
        </View>
        <ThemedText type="subtitle" style={styles.cardSubtitle}>
          I am the parent screen with a clean state card.
        </ThemedText>

        <View style={styles.infoCard}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            State Locker
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.infoValue}>
            count: {count}
          </ThemedText>
        </View>

        <View style={styles.actionCard}>
          <ThemedText type="subtitle">Child Component</ThemedText>
          <ThemedText style={styles.childHint}>Props data coming from parent state</ThemedText>
          <ThemedText type="title" style={styles.counterValue}>
            {count}
          </ThemedText>

          <View style={styles.buttonGroup}>
            <Pressable
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => setCount((prev) => prev + 1)}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Add Count
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => setCount((prev) => prev - 1)}>
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Minus Count
              </ThemedText>
            </Pressable>
          </View>

          <Pressable
            style={[styles.actionButton, styles.tertiaryButton]}
            onPress={() => setCount(100)}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Reset Count
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  screenCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#ffffffcc',
    shadowColor: '#ac9d9d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleBadge: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
  },
  cardSubtitle: {
    color: '#4B4B6A',
  },
  infoCard: {
    borderRadius: 20,
    backgroundColor: '#36b37e30',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  infoTitle: {
    color: '#1f6f50',
  },
  infoValue: {
    fontSize: 24,
    color: '#0b3d26',
  },
  actionCard: {
    borderRadius: 24,
    backgroundColor: '#f5f7ff',
    padding: 20,
    gap: 16,
  },
  childHint: {
    color: '#556080',
    fontSize: 14,
  },
  counterValue: {
    alignSelf: 'center',
    fontSize: 52,
    color: '#1f2a44',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  primaryButton: {
    backgroundColor: '#ff2d95',
  },
  secondaryButton: {
    backgroundColor: '#ff5f5f',
  },
  tertiaryButton: {
    backgroundColor: '#8f919d',
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
