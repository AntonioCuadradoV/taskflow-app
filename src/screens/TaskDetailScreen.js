
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../constants/colors';
import { TasksContext } from '../context/TasksContext';

export default function TaskDetailScreen({ route }) {
  const { taskId } = route.params;
  const { tasks } = useContext(TasksContext);

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre de la tarea</Text>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.description}>
          {task.description}
        </Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{task.category}</Text>

        <Text style={styles.label}>Fecha de creación</Text>
        <Text style={styles.value}>
          {new Date(task.createdAt).toLocaleDateString('es-AR')}
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
  },
  card: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 16,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
    lineHeight: 24,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
  },
});
