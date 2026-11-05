
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';
import { TasksContext } from '../context/TasksContext';

export default function TaskListScreen({ navigation }) {
  const { tasks } = useContext(TasksContext);

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() =>
        navigation.navigate('TaskDetail', { taskId: item.id })
      }
    >
      <Text style={styles.taskTitle}>{item.title}</Text>

      <Text style={styles.taskDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTask}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>

          <Text style={styles.title}>
            Bienvenido a TaskFlow
          </Text>

          <ProfileCard
            name="Antonio"
            role="Administrador"
            image="https://i.pravatar.cc/150?img=12"
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.tasksTitle}>
              Mis tareas ({tasks.length})
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('TaskForm')}
            >
              <Text style={styles.addButtonText}>
                + Nueva
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          ¡No tienes tareas pendientes! Empieza por crear una arriba.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 30,
    flexGrow: 1,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  empty: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    color: colors.textSecondary,
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  taskDescription: {
    color: colors.textSecondary,
    marginTop: 7,
  },
  category: {
    color: '#4F46E5',
    marginTop: 10,
    fontWeight: '600',
  },
});
