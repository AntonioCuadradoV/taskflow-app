
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  toggleTaskStatus,
  deleteTask,
} from '../redux/taskSlice';

import colors from '../constants/colors';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const dispatch = useDispatch();

  const task = useSelector((state) =>
    state.tasks.items.find((item) => item.id === taskId)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          No se encontró la tarea.
        </Text>
      </View>
    );
  }

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que querés eliminar esta tarea? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTask(task.id));
            navigation.navigate('TaskList');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.description}>{task.description}</Text>

      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.info}>{task.category}</Text>

      <Text style={styles.label}>Fecha de creación</Text>
      <Text style={styles.info}>
        {new Date(task.createdAt).toLocaleDateString('es-AR')}
      </Text>

      <Text style={styles.label}>Estado</Text>
      <Text style={styles.info}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleToggleStatus}
      >
        <Text style={styles.buttonText}>
          {task.completed
            ? 'Marcar como pendiente'
            : 'Marcar como completada'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteTask}
      >
        <Text style={styles.deleteButtonText}>
          Eliminar tarea
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 18,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  info: {
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  notFound: {
    fontSize: 18,
    color: colors.text,
  },
});
