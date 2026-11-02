import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';

const users = [
  {
    id: 1,
    name: 'Antonio',
    role: 'Administrador',
    image: 'https://i.pravatar.cc/150?img=12',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Lucía Fernández',
    role: 'Desarrolladora',
    image: 'https://i.pravatar.cc/150?img=47',
    status: 'Activo',
  },
  {
    id: 3,
    name: 'Martín Gómez',
    role: 'Colaborador',
    image: 'https://i.pravatar.cc/150?img=11',
    status: 'Inactivo',
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Perfiles</Text>

      <Text style={styles.subtitle}>
        Gestión de usuarios de TaskFlow
      </Text>

      {users.map((user) => (
        <ProfileCard
          key={user.id}
          name={user.name}
          role={user.role}
          image={user.image}
          status={user.status}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 24,
  },
});