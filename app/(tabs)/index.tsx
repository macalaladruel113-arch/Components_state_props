import { ScrollView, StyleSheet, Alert, TouchableOpacity, View, Pressable, Image, ImageBackground } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface SkillItem {
  id: string;
  name: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

const skills: SkillItem[] = [
  { id: '2', name: 'TypeScript' },
  { id: '3', name: 'JavaScript' },
  { id: '6', name: 'UI/UX Design' },
  { id: '7', name: 'Mobile Development' },
];

const projects: ProjectItem[] = [
  {
    id: '1',
    title: 'Pawsitive Vibes',
    description: 'A comprehensive pet-friendly community platform with e-commerce capabilities. Users can discover pet services, products, and connect with other pet owners. Enhanced navigation and streamlined checkout process improved conversion rates by 35%.',
    technologies: ['React Native', 'TypeScript', 'Expo'],
  },
  {
    id: '2',
    title: 'Phikul Taste Bakery',
    description: 'A modern ordering platform for a local bakery business. Features include product browsing, real-time order tracking, and integrated payment system. Enabled remote ordering and increased customer engagement by 50%.',
    technologies: ['React Native', 'Firebase', 'Stripe'],
  },
  {
    id: '3',
    title: 'Task Manager Pro',
    description: 'A lightweight task management application with real-time synchronization across devices. Includes prioritization, due dates, and collaborative team features for seamless productivity.',
    technologies: ['React Native', 'Redux', 'TypeScript'],
  },
];

export default function PortfolioScreen(): React.ReactElement {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleContactPress = (): void => {
    Alert.alert(
      'Get in Touch',
      'Email: ruel.macalalad@example.com\n\nPhone: +1 (555) 123-4567\n\nLocation: San Francisco, CA',
      [
        {
          text: 'Close',
          onPress: (): void => console.log('Contact modal closed'),
          style: 'default',
        },
        {
          text: 'Send Email',
          onPress: (): void => {
            Alert.alert('Success', 'Email feature will be implemented soon!');
          },
          style: 'default',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <Image
          source={require('@/assets/images/Avatar.jpg')}
          style={styles.avatarImage}
        />
        <ThemedText type="title" style={styles.name}>
          Ruel Macalalad
        </ThemedText>
        <ThemedText style={styles.tagline}>
          Mobile Developer & UI/UX Enthusiast
        </ThemedText>
        <ThemedText style={styles.statusBadge}>
          Open for Opportunities 🚀
        </ThemedText>
      </ThemedView>

      {/* About Me Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          About Me
        </ThemedText>
        <ThemedText style={styles.aboutText}>
          Motivated computer science professional with a strong background in programming, 
          algorithms, and data structures. Experienced in building scalable mobile applications 
          using React Native and modern web technologies. Passionate about creating intuitive 
          user experiences and implementing clean, maintainable code. Enthusiastic about 
          translating academic knowledge into real-world solutions.
        </ThemedText>
      </ThemedView>

      {/* Skills Matrix Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Technical Skills
        </ThemedText>
        <View style={styles.skillsGrid}>
          {skills.map((skill: SkillItem): React.ReactElement => (
            <Pressable
              key={skill.id}
              style={({ pressed }): object => [
                styles.skillChip,
                pressed && styles.skillChipPressed,
              ]}
            >
              <ThemedText style={styles.skillText}>{skill.name}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      {/* Projects Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Featured Projects
        </ThemedText>
        {projects.map((project: ProjectItem): React.ReactElement => (
          <View key={project.id} style={styles.projectCard}>
            <ThemedText type="defaultSemiBold" style={styles.projectTitle}>
              {project.title}
            </ThemedText>
            <ThemedText style={styles.projectDescription}>{project.description}</ThemedText>
            <View style={styles.technologiesContainer}>
              {project.technologies.map((tech: string, index: number): React.ReactElement => (
                <View key={index} style={styles.techTag}>
                  <ThemedText style={styles.techTagText}>{tech}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ThemedView>

      {/* Contact Section */}
      <ThemedView style={styles.contactSection}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactPress}
          activeOpacity={0.75}
        >
          <ThemedText style={styles.contactButtonText}>Get in Touch</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.footerText}>
          Let's build something amazing together
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 8,
  },
  statusBadge: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    opacity: 0.85,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.85,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillChip: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  skillChipPressed: {
    backgroundColor: '#357ABD',
    opacity: 0.85,
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  projectCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  projectTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  techTagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
  },
  contactSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
