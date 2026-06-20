import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const CONTENT_MAX_WIDTH = 680;
const isWideScreen = isWeb && SCREEN_WIDTH > 768;


const COLORS = {
  deepCrimson: '#4A0E17',
  darkBurgundy: '#2A080C',
  metallicGold: '#D4AF37',
  pureWhite: '#FFFFFF',
  mediumGray: '#A3A3A3',
  translucentWhite07: 'rgba(255,255,255,0.07)',
  translucentWhite12: 'rgba(255,255,255,0.12)',
  translucentBlack: 'rgba(0,0,0,0.2)',
};


interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}


function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`;
}

function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function weatherCodeToDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 49) return 'Foggy';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  return 'Thunderstorm';
}


function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.sectionLabel}>
      <Ionicons name={icon as any} size={12} color={COLORS.metallicGold} />
      <Text style={styles.sectionLabelText}>{label}</Text>
    </View>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function WeatherStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.weatherStat}>
      <Text style={styles.weatherStatLabel}>{label}</Text>
      <Text style={styles.weatherStatValue}>{value}</Text>
    </View>
  );
}


export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

 
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=13.9&longitude=120.6' +
            '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m' +
            '&wind_speed_unit=kmh&temperature_unit=celsius'
        );
        const data = await res.json();
        const c = data.current;
        setWeather({
          temperature: Math.round(c.temperature_2m),
          description: weatherCodeToDescription(c.weather_code),
          humidity: Math.round(c.relative_humidity_2m),
          windSpeed: Math.round(c.wind_speed_10m),
        });
      } catch {
       
        setWeather({
          temperature: 31,
          description: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
        });
      } finally {
        setWeatherLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.deepCrimson, COLORS.darkBurgundy]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.deepCrimson} />
      <SafeAreaView style={styles.safeArea}>
        {/* Location pinned to top */}
        <View style={styles.locationBadge}>
          <Ionicons name="location-sharp" size={12} color={COLORS.metallicGold} />
          <Text style={styles.locationText}>NASUGBU BATANGAS, PH</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>

          <Card>
            <SectionLabel icon="time-outline" label="CURRENT TIME" />
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={10} color={COLORS.mediumGray} />
              <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
            </View>
          </Card>


          <Card>
            <SectionLabel icon="help-circle-outline" label="WEATHER UPDATES" />
            {weatherLoading ? (
              <ActivityIndicator color={COLORS.metallicGold} style={{ marginVertical: 16 }} />
            ) : (
              <>
                <Text style={styles.tempText}>{weather?.temperature}°C</Text>
                <Text style={styles.weatherDesc}>{weather?.description}</Text>
                <View style={styles.weatherStats}>
                  <WeatherStat label="HUMIDITY" value={`${weather?.humidity}%`} />
                  <View style={styles.weatherDivider} />
                  <WeatherStat label="WIND" value={`${weather?.windSpeed} km/h`} />
                </View>
              </>
            )}
          </Card>

          <Card style={styles.nameCard}>
            <View style={styles.nameLabelRow}>
              <Ionicons name="logo-react" size={11} color={COLORS.metallicGold} />
              <Text style={[styles.sectionLabelText, { fontSize: 9 }]}>REACT NATIVE</Text>
            </View>
            <Text style={[styles.nameText, { textAlign: 'center' }]}>SIR MAGS</Text>
          </Card>

          </View>
        </ScrollView>

        
        <View style={styles.footer}>
          <Ionicons name="logo-react" size={11} color={COLORS.metallicGold} />
          <Text style={styles.footerText}>REACT NATIVE · LIVE MONITORS</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: isWideScreen ? 40 : 8,
    paddingBottom: isWideScreen ? 48 : 24,
    alignItems: isWeb ? 'center' : undefined,
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: isWeb ? CONTENT_MAX_WIDTH : undefined,
    paddingHorizontal: isWideScreen ? 0 : 20,
  },

  
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    alignSelf: 'center',
    backgroundColor: COLORS.translucentWhite07,
    borderWidth: 0.5,
    borderColor: COLORS.translucentWhite12,
    borderRadius: 20,
    paddingVertical: isWideScreen ? 7 : 7,
    paddingHorizontal: isWideScreen ? 18 : 16,
    marginTop: 12,
    marginBottom: 4,
  },
  locationText: {
    color: COLORS.pureWhite,
    fontSize: isWideScreen ? 13 : 13,
    fontWeight: '600',
    letterSpacing: 1,
  },

  
  card: {
    backgroundColor: COLORS.translucentWhite07,
    borderWidth: 0.5,
    borderColor: COLORS.translucentWhite12,
    borderRadius: isWideScreen ? 20 : 18,
    padding: isWideScreen ? 28 : 22,
    marginBottom: isWideScreen ? 16 : 14,
  },

  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: isWideScreen ? 14 : 10,
  },
  sectionLabelText: {
    color: COLORS.metallicGold,
    fontSize: isWideScreen ? 11 : 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  
  timeText: {
    color: COLORS.pureWhite,
    fontSize: isWideScreen ? 52 : 34,
    fontWeight: '300',
    letterSpacing: -0.5,
    marginBottom: isWideScreen ? 10 : 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateText: {
    color: COLORS.mediumGray,
    fontSize: isWideScreen ? 15 : 14,
  },

  
  tempText: {
    color: COLORS.pureWhite,
    fontSize: isWideScreen ? 64 : 44,
    fontWeight: '700',
    marginBottom: 2,
  },
  weatherDesc: {
    color: COLORS.mediumGray,
    fontSize: isWideScreen ? 17 : 15,
    marginBottom: isWideScreen ? 20 : 16,
  },
  weatherStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.translucentBlack,
    borderRadius: 10,
    overflow: 'hidden',
  },
  weatherStat: {
    flex: 1,
    paddingVertical: isWideScreen ? 14 : 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  weatherDivider: {
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 18,
  },
  weatherStatLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: isWideScreen ? 10 : 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 3,
  },
  weatherStatValue: {
    color: COLORS.pureWhite,
    fontSize: isWideScreen ? 22 : 18,
    fontWeight: '500',
  },

  nameCard: {
    paddingVertical: isWideScreen ? 32 : 24,
  },
  nameLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  nameText: {
    color: COLORS.pureWhite,
    fontSize: isWideScreen ? 40 : 30,
    fontWeight: '700',
    letterSpacing: 3,
  },


  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  footerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: isWideScreen ? 11 : 9,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
});