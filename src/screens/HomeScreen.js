import { View, Text, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola!</Text>

      <Text style={styles.title}>
        Bienvenido a TaskFlow
      </Text>

      <ProfileCard
        name="Antonio"
        role="Administrador"
        image="https://i.pravatar.cc/150?img=12"
      />

      <View style={styles.tasks}>
        <Text style={styles.tasksTitle}>
          Mis tareas
        </Text>

        <Text style={styles.empty}>
          Todavía no tenés tareas pendientes.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 60,
  },

  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 5,
    marginBottom: 20,
  },

  tasks: {
    marginTop: 30,
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },

  tasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },

  empty: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});